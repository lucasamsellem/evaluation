import User from "./db/models/User.js";

const user = {
	firstName: "Alan",
	lastName: "Turing",
	email: "alan.turing@comp.com",
	password: "73a056240baf641c8dc2c9bab20e0c2b457bd6e4",
	role: "admin",
};

async function insertUser() {
	await User.deleteMany({});
	await User.insertOne(user);
	console.log("Initial user inserted");
	process.exit(0);
}

insertUser();
