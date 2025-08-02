import { isAdmin, isAuthor } from "../controllers/verify.controler.js";
import express from 'express';

const VerifyRoute = express.Router();

VerifyRoute.post('/admin', isAdmin);
VerifyRoute.post('/author', isAuthor);

export default VerifyRoute;