import mongoose from "mongoose";

async function db() {
	try {
		const connString = process.env.MANGO_URI;
		const conn = await mongoose.connect(connString as string, {
			dbName: "FoodMind",
		});
		// Establish and verify connection

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (e) {
		console.log("could not connect");
	}
}

export default db;
