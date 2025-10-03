import { Router } from 'express';
import { getDashboard, getAdmin } from '../controllers/admin';

const adminRoute = Router();

adminRoute.get('/dashboard', getDashboard);
adminRoute.get('/admin', getAdmin);

export default adminRoute;
