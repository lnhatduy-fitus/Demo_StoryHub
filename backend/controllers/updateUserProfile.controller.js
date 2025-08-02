import { connection } from '../database/postgresDB.js';

const updateUserProfile = async (req, res) => {
  const { userId, name, email, gender, birthdate } = req.body;

  if (!userId || !name || !email) {
    return res.status(400).json({ message: 'userId, name, and email are required' });
  }

  try {
    const result = await connection.query(
      'SELECT sp_update_user_profile($1, $2, $3, $4, $5) AS message',
      [userId, name, email, gender, birthdate]
    );

    return res.status(200).json({ message: result.rows[0].message });
  } catch (err) {
    console.error('Error updating user profile:', err);
    return res.status(500).json({ message: 'Failed to update user profile' });
  }
};

export default updateUserProfile;
