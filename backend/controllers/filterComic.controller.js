import { connection } from '../database/postgresDB.js';

const filterComicsByGenres = async (req, res) => {
  const genres = req.query.genres;

  // genres có thể là chuỗi hoặc mảng query: ?genres=Hành%20động&genres=Phiêu%20lưu
  const genreArray = Array.isArray(genres)
    ? genres.map(g => g.trim()).filter(Boolean)
    : typeof genres === 'string'
    ? [genres.trim()]
    : [];

  if (genreArray.length === 0) {
    return res.status(400).json({ message: 'Genres are required as query parameters' });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM sp_filter_comics_by_genre_array($1)',
      [genreArray]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Filter error:', error);
    return res.status(500).json({ message: 'Filtering failed' });
  }
};

export default filterComicsByGenres;
