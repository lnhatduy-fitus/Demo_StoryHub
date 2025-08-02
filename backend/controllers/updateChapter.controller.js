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
 * Cập nhật / xoá chương truyện dựa trên action và chapterId
 * - action = 'upsert'  → cập nhật chương
 * - action = 'delete'  → xoá chương
 */
const updateChapter = async (req, res) => {
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
    const chapterId = parseInt(fields.chapterId, 10);
    const chapterNumber = parseInt(fields.chapterNumber, 10);
    const title = sanitizeText(fields.title);
    const action = sanitizeText(fields.action || 'upsert');
    const imageFiles = files.imageFiles;
    const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    if (!comicId || !chapterId) {
      return res.status(400).json({ message: 'comicId và chapterId là bắt buộc' });
    }

    let uploadedUrls = [];
    if (action !== 'delete') {
      if (!title || !imageFiles) {
        return res.status(400).json({ message: 'Thiếu title hoặc images khi action là upsert' });
      }

      uploadedUrls = await uploadCloud(`comic_${comicId}_chapter_${chapterNumber}`, 'chapter', filesArray);
    }
    const result = await connection.query(
      'SELECT sp_update_chapter($1, $2, $3, $4, $5, $6) AS message',
      [comicId, chapterId, title, chapterNumber, uploadedUrls || [], action]
    );

    return res.status(200).json({ message: result.rows[0].message });

  } catch (err) {
    console.error('Error in updateChapter:', err);
    return res.status(500).json({ message: 'Lỗi cập nhật chương' });
  }
};

export default updateChapter;
