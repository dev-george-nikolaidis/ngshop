import express, { Request, Response } from "express";
import cors from "cors";
import { sample_foods, sample_tags } from "./data";

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

app.get("/api/foods/search/:searchParam", (req: Request<{ searchParam: string }>, res: Response) => {
	// const searchTerm = req.params["searchParam"];
	const searchTerm = req.params.searchParam;
	console.log(searchTerm);
	const foods = sample_foods.filter((food: any) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
	res.send(foods);
});

app.get("/api/foods/tags/:tagName", (req, res) => {
	const tagName = req.params.tagName;
	const foods = sample_foods.filter((food) => food.tags.includes(tagName));
	res.send(foods);
});
app.get("/api/foods/:foodId", (req, res) => {
	const foodId = req.params.foodId;
	const food = sample_foods.find((food) => food.id == foodId);
	res.send(food);
});

app.get("/api/foods/tags", (req, res) => {
	res.send(sample_tags);
});
app.get("/api/foods", (req, res) => {
	res.send(sample_foods);
});

app.listen(5000, () => {
	console.log("listening on port 5000");
});
