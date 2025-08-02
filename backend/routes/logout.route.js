import express from 'express';
import logoutAuth from '../controllers/logout.controller.js';

const LogoutRouter = express.Router();

LogoutRouter.post('/', logoutAuth);

export default LogoutRouter;