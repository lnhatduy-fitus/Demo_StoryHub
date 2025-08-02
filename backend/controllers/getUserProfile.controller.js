import { connection } from '../database/postgresDB.js';

const getUserProfile = async (req, res) => {
  const userId = parseInt(req.query.userId);

  if (!userId) {
    return res.status(400).json({ message: 'userId is required as query param' });
  }

  try {
    const result = await connection.query(
      'SELECT * FROM sp_get_user_profile($1)',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error getting user profile:', err);
    return res.status(500).json({ message: 'Failed to get user profile' });
  }
};

export default getUserProfile;
