import express from "express";
import cors from "cors";
import routes from "./routes";
import db from "./config/db";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
db();

app.use(express.json());
app.use("/api/v1", routes);

app.listen(5000, () => {
	console.log("listening on port 5000");
});
