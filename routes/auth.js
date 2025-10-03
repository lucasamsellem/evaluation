import { Router } from 'express';
import { getLoginForm, postLoginForm, logout, getRegisterForm } from '../controllers/user.js';
import { authMiddleware } from '../middlewares/auth.js';

const userRoute = Router();

userRoute.get('/login', getLoginForm);
userRoute.get('/register', getRegisterForm);
userRoute.post('/login', postLoginForm);
userRoute.get('/logout', authMiddleware, logout);

export default userRoute;
