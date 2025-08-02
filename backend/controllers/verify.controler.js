import { decrypt } from '../services/auth.js';

export const isAdmin = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      console.log('No token');
      return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    const payload = await decrypt(token);

    if (!payload || payload.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    return res.status(200).json({ message: 'Is admin', role: 'admin' });

  } catch (err) {
    console.error('Auth error:', err);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export const isAuthor = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const payload = await decrypt(token);

    if (!payload.role || payload.role !== 'Uploader') {
      return res.status(403).json({ message: 'Forbiden: not an author' });
    }

    res.status(200).json({ message: 'Is author' });
  } catch (err) {
    console.error({ err });
    return res.status(400).json({ message: 'Invalid token' });
  }
}
