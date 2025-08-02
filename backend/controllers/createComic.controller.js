import { connection } from '../database/postgresDB.js';
import { parseForm, uploadCloud } from '../services/uploadCloud.service.js';
import { decrypt } from '../services/auth.js';

const sanitizeText = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/^["{]+/, '')
    .replace(/["}]+$/, '')
    .replace(/["{}]/g, '')
    .trim();
};

const createComic = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    const payload = await decrypt(token);
    if (payload.role !== 'Uploader') {
      return res.status(403).json({ message: 'Forbidden: Only Uploader allowed' });
    }

    const { fields, files } = await parseForm(req);

    const title = sanitizeText(fields.title);
    const description = sanitizeText(fields.description);
    const status = sanitizeText(fields.status || 'Đang thực hiện');
    const coverFile = files.coverFile;
    const authorId = payload.id;

    // const genres = fields.genres || [];
    // if (!Array.isArray(genres)) {
    //   genres = [genres];
    // }

    // for (let i = 0; i < genres.length; i++) {
    //   genres[i] = sanitizeText(genres[i]);
    // //genres = genres.map(sanitizeText).filter(g => g); // loại bỏ chuỗi rỗng
    // }

    let genres = fields.genres || [];

    if (typeof genres === 'string') {
      // Nếu là 1 chuỗi có định dạng mảng PostgreSQL: "{A;B;C}"
      genres = genres
        .replace(/^{|}$/g, '')      // xóa { và }
        .split(';')                 // tách theo dấu ;
        .map(item => sanitizeText(item))
        .filter(item => item);      // loại bỏ chuỗi rỗng
    } else if (Array.isArray(genres)) {
      genres = genres.map(sanitizeText).filter(item => item);
    } else {
      genres = [];
    }

    if (!title || isNaN(authorId) || !coverFile || genres.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or image or genres' });
    }

    const imageUrls = await uploadCloud(title, 'cover', coverFile);
    const imageUrl = imageUrls[0];

    const result = await connection.query(
      'SELECT sp_create_comic($1, $2, $3, $4, $5, $6) AS comicId',
      [title, description, genres, authorId, imageUrl, status]
    );

    return res.status(201).json({
      message: 'Comic created',
      comicId: parseInt(result.rows[0].comicid, 10)
    });

  } catch (err) {
    console.error('Create comic error:', err);
    return res.status(500).json({ error: 'Failed to create comic' });
  }
};

export default createComic;
