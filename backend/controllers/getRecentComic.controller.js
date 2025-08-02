import { connection } from '../database/postgresDB.js';

async function getRecentComic(req, res) {
  try {
    const result = await connection.query(
      'SELECT * FROM sp_get_recent_comics()'
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching recent comics:', error);
    res.status(500).json({ message: 'Failed to fetch recent comics' });
  }
}

export default getRecentComic;
