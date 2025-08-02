import express from 'express';
import getComicDetails from '../controllers/getComicDetails.controller.js';
import getPopularComic from '../controllers/getPopularComic.controller.js';
import getRecentComic from '../controllers/getRecentComic.controller.js';
import searchComics from '../controllers/searchComic.controller.js';
import getAuthorComic from '../controllers/getAuthorComic.controller.js';
import createComic from '../controllers/createComic.controller.js';
import filterComicByGenres from '../controllers/filterComic.controller.js';
const ComicRouter = express.Router();

ComicRouter.get('/details', getComicDetails);
ComicRouter.get('/popular', getPopularComic);
ComicRouter.get('/recent', getRecentComic);
ComicRouter.get('/search', searchComics);
ComicRouter.get('/filter', filterComicByGenres);
ComicRouter.get('/uploaded', getAuthorComic);
ComicRouter.post('/create', createComic);
export default ComicRouter;
