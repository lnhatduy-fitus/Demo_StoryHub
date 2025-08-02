import { connection } from '../database/postgresDB.js';

export const insertReadingHistory = async (req, res) => {
  const { userId, comicId, chapterId } = req.body;

  if (!userId || !comicId || !chapterId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connection.query(
      `INSERT INTO readinghistory (userid, comicid, chapterid)
       VALUES ($1, $2, $3)
       ON CONFLICT (userid, comicid) DO UPDATE 
       SET chapterid = EXCLUDED.chapterid,
           lastread = CURRENT_TIMESTAMP;`,
      [userId, comicId, chapterId]
    );
    return res.status(200).json({ message: 'Reading history saved' });
  } catch (err) {
    console.error('Insert reading history error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
};
