import { Router } from "express";
import { getDashboard, getAdmin } from "../controllers/admin.js";

const adminRoute = Router();

adminRoute.get("/", getDashboard);
adminRoute.get("/admin", getAdmin);

export default adminRoute;
