import { Router } from 'express';
import userRoute from '../routes/auth.js';

const router = Router();

router.use(userRoute);

export default router;
