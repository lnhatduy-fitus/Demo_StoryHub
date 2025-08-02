import { connection } from '../database/postgresDB.js';

const searchComics = async (req, res) => {
  const keyword = req.query.keyword?.trim();

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required as query parameter' });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM sp_search_comics($1)',
      [keyword]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Search failed' });
  }
};

export default searchComics;
