import { Router } from "express";
import { getDashboard, getAdmin } from "../controllers/admin.js";
import { isAdmin } from "../middlewares/auth.js";

const adminRoute = Router();

adminRoute.get("/", getDashboard);
adminRoute.get("/admin", isAdmin, getAdmin);

export default adminRoute;
