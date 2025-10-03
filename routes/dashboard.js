import { Router } from "express";
import { getDashboard } from "../controllers/admin";
import { isConnected } from "../middlewares/auth";

const dashboardRoute = Router();

dashboardRoute.get("/dashboard", isConnected, getDashboard);

export default dashboardRoute;
