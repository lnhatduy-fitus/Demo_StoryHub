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

/**
 * Thêm chương mới cho truyện
 */
const addChapter = async (req, res) => {
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

    const comicId = parseInt(fields.comicId, 10);
    const chapterNumber = parseInt(fields.chapterNumber, 10);
    const title = sanitizeText(fields.title);
    const imageFiles = files.imageFiles;
    const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    if (!comicId || !title || !chapterNumber || !imageFiles) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const uploadedUrls = await uploadCloud(`comic_${comicId}_chapter_${chapterNumber}`, 'chapter', filesArray);

    const result = await connection.query(
      'SELECT sp_add_chapter($1, $2, $3, $4) AS chapterId',
      [comicId, title, chapterNumber, uploadedUrls]
    );

    return res.status(201).json({ message: result.rows[0].message });

  } catch (err) {
    console.error('Error in addChapter:', err);
    return res.status(500).json({ message: 'Lỗi khi thêm chương mới' });
  }
};

export default addChapter;
