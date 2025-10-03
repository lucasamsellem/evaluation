import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export function isConnected(req, res, next) {
	if (req.session.isConnected) {
		next();
	} else {
		res.redirect("/login");
	}
	next();
}

export function isNotConnected(req, res, next) {
	if (!req.session.isConnected) {
		next();
	} else {
		res.redirect("/");
	}
}

export function isAdmin(req, res, next) {
	if (req.session.isAdmin) {
		next();
	} else {
		res.redirect("/");
	}
}

// Avec JWT
/* export function authMiddleware(req, res, next) {
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
*/
