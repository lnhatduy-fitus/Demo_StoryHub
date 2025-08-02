import express from 'express';
import { insertReadingHistory } from '../controllers/readingHistory.controller.js';

const HistoryRouter = express.Router();

HistoryRouter.post('/readingHistory', insertReadingHistory);

export default HistoryRouter;
