import dotenv from 'dotenv';
import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { refreshSession } from './middleware/session.js';
import VerifyRoute from './routes/verify.route.js';
import LoginRouter from './routes/login.route.js';
import LogoutRouter from './routes/logout.route.js';
import RegisterRouter from './routes/register.route.js';
import ComicRouter from './routes/comic.route.js';
import ChapterRouter from './routes/chapter.route.js';
import UserRouter from './routes/user.route.js';
import HistoryRouter from './routes/readingHistory.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
console.log('🌐 CORS Origin:', process.env.NEXT_PUBLIC_FRONTEND_URL);
app.use(cors({
  origin: [process.env.NEXT_PUBLIC_FRONTEND_URL, 'http://116.118.60.232:1307'],
  credentials: true
}));
app.use(cookieParser());
app.use(refreshSession);

app.use('/api/login', LoginRouter);
app.use('/api/logout', LogoutRouter);
app.use('/api/register', RegisterRouter);
app.use('/api/verify', VerifyRoute);
app.use('/api/comic', ComicRouter);
app.use('/api/chapter', ChapterRouter);
app.use('/api/user', UserRouter);
app.use('/api', HistoryRouter);



app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
