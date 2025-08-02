import { connection } from '../database/postgresDB.js';

async function getPopularComic(req, res) {
  const minViewCount = parseInt(req.query.minViewCount) || 0;

  try {
    const result = await connection.query(
      'SELECT * FROM sp_get_popular_comics($1)',
      [minViewCount]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching popular comics:', error);
    res.status(500).json({ message: 'Failed to fetch popular comics' });
  }
}

export default getPopularComic;
