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

const createChapter = async (req, res) => {
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
    const title = sanitizeText(fields.title);
    const chapterNumber = parseInt(fields.chapterNumber, 10);
    const imageFiles = files.imageFiles; 

    //console.log('Parsed fields:', fields);
    //console.log('Parsed files:', files);
    if (!comicId || isNaN(chapterNumber) || !title || !imageFiles) {
      return res.status(400).json({ message: 'Missing required fields or images' });
    }

    // Trường hợp 1 ảnh: imageFiles là object, nhiều ảnh: array
    const filesArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    const uploadedUrls = await uploadCloud(`comic_${comicId}_chapter_${chapterNumber}`, 'chapter', filesArray);

    const result = await connection.query(
      'SELECT sp_create_chapter($1, $2, $3, $4) AS chapterId',
      [comicId, title, chapterNumber, uploadedUrls]
    );

    return res.status(201).json({
      message: 'Chapter created',
      chapterId: parseInt(result.rows[0].chapterid, 10)
    });

  } catch (err) {
    console.error('Create chapter error:', err);
    return res.status(500).json({ error: 'Failed to create chapter' });
  }
};

export default createChapter;
