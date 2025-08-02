import express from 'express';
import Register from '../controllers/register.controller.js';

const RegisterRouter = express.Router();

RegisterRouter.post('/', Register);

export default RegisterRouter;
