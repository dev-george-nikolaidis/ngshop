import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
const app = express();
app.use(
	cors({
		origin: "*",
	})
);

app.use(express.json());
app.use("/api/v1", routes);

app.listen(5000, () => {
	console.log("listening on port 5000");
});
