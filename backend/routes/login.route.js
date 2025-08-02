import express from 'express'
import loginAuth from "../controllers/login.controller.js";

const LoginRouter = express.Router();

LoginRouter.post('/', loginAuth);

export default LoginRouter;


