import { Router } from 'express';
import { getDashboard } from '../controllers/admin';

const dashboardRoute = Router();

dashboardRoute.get('/dashboard', getDashboard);

export default dashboardRoute;
