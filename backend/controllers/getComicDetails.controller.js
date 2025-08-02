import { connection } from '../database/postgresDB.js';

const getComicDetails = async (req, res) => {
  const comicId = parseInt(req.query.comicId);

  if (!comicId) {
    return res.status(400).json({ message: 'comicId is required as a query parameter' });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM sp_get_comic_details($1)',
      [comicId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Comic not found' });
    }

    const row = result.rows[0];

    const chapters = (row.chapter_ids || [])
      .map((id, index) => ({
        chapterId: id,
        title: row.chapter_titles?.[index],
        uploadDate: row.upload_dates?.[index]
      }))
      .filter(ch => ch.chapterId !== null);

    const comicData = {
      title: row.title,
      author: row.author_name,
      status: row.status,
      likeCount: row.like_count,
      viewCount: row.view_count,
      description: row.description,
      chapters
    };

    return res.status(200).json(comicData);
  } catch (err) {
    console.error('Error fetching comic details:', err);
    res.status(500).json({ message: 'Failed to fetch comic details' });
  }
};

export default getComicDetails;
