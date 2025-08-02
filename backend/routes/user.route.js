import express from 'express';
import getUserProfile from '../controllers/getUserProfile.controller.js';
import updateUserProfile from '../controllers/updateUserProfile.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const UserRouter = express.Router();

UserRouter.get('/profile', requireAuth, getUserProfile);
UserRouter.put('/update', requireAuth, updateUserProfile);

export default UserRouter;
