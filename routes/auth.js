import { Router } from "express";
import { isNotConnected, isConnected } from "../middlewares/auth.js";
import {
	getLoginForm,
	postLoginForm,
	logout,
	getRegisterForm,
	postRegisterForm,
} from "../controllers/user.js";

const userRoute = Router();

userRoute.get("/login", isNotConnected, getLoginForm);
userRoute.get("/register", isNotConnected, getRegisterForm);
userRoute.post("/register", isNotConnected, postRegisterForm);
userRoute.post("/login", isNotConnected, postLoginForm);
userRoute.get("/logout", isConnected, logout);

export default userRoute;
