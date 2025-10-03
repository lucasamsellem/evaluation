import { Router } from 'express';
import { getLoginForm, postLoginForm, logout, getRegisterForm } from '../controllers/user.js';

const userRoute = Router();

userRoute.get('/login', getLoginForm);
userRoute.get('/register', getRegisterForm);
userRoute.post('/login', postLoginForm);
userRoute.get('/logout', logout);

export default userRoute;
