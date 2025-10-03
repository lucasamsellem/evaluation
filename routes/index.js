import { Router } from "express";
import userRoute from "../routes/auth.js";
import adminRoute from "./admin.js";

const router = Router();

router.use(userRoute);
router.use(adminRoute);

export default router;
