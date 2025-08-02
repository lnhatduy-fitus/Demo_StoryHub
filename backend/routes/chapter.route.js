import express from 'express';
import createChapter from '../controllers/createChapter.controller.js';
import updateChapter from '../controllers/updateChapter.controller.js';
import addChapter from '../controllers/addChapter.controller.js';
import getChapterImages from '../controllers/getChapterImages.controller.js';

const ChapterRouter = express.Router();


ChapterRouter.post('/create', createChapter);        
ChapterRouter.put('/update', updateChapter);          
ChapterRouter.post('/add', addChapter);              
ChapterRouter.get('/images', getChapterImages);

export default ChapterRouter;
