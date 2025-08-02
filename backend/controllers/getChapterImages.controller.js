import { connection } from '../database/postgresDB.js';

const getChapterImages = async (req, res) => {
  const comicId = parseInt(req.query.comicId);
  const chapterId = parseInt(req.query.chapterId);

  if (!comicId || !chapterId) {
    return res.status(400).json({ message: 'comicId and chapterId are required as query params' });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM sp_get_chapter_images($1, $2)',
      [comicId, chapterId]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching chapter images:', err);
    res.status(500).json({ message: 'Failed to fetch chapter images' });
  }
};

export default getChapterImages;
