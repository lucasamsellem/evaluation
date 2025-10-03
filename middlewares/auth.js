import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export function isConnected(req, res, next) {
	res.locals.isConnected = req.session.isConnected;
	next();
}

export function isAdmin(req, res, next) {
	// comment test si c'est admin ?
}

export function authMiddleware(req, res, next) {
	if (!req.session.token) {
		req.session.message = {
			type: "error",
			message: "Vous devez être connécté pour accéder à cette page.",
		};

		res.redirect("/login");
		return;
	}

	const decoded = jwt.decode(req.session.token, JWT_SECRET);

	if (!decoded) {
		req.session.message = {
			type: "error",
			message: "Vous devez être connécté pour accéder à cette page.",
		};

		res.redirect("/login");
		return;
	}

	next();
}
