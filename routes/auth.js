import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import {
  getLoginForm,
  postLoginForm,
  logout,
  getRegisterForm,
  postRegisterForm,
} from '../controllers/user.js';

const userRoute = Router();

userRoute.get('/login', getLoginForm);
userRoute.get('/register', getRegisterForm);
userRoute.post('/register', postRegisterForm);
userRoute.post('/login', postLoginForm);
userRoute.get('/logout', authMiddleware, logout);

export default userRoute;
