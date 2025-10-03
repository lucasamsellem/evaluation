import { Router } from "express";
import { getDashboard, getAdmin } from "../controllers/admin.js";
import { isAdmin, isConnected } from "../middlewares/auth.js";

const adminRoute = Router();

adminRoute.get("/", isConnected, getDashboard);
adminRoute.get("/admin", isConnected, isAdmin, getAdmin);

export default adminRoute;
