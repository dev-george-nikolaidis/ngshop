import express, { Request, Response } from "express";
import { sample_foods, sample_tags, sample_users } from "./data";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

router.get("/foods/search/:searchParam", (req: Request<{ searchParam: string }>, res: Response) => {
	// const searchTerm = req.params["searchParam"];
	const searchTerm = req.params.searchParam;
	console.log(searchTerm);
	const foods = sample_foods.filter((food: any) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
	res.send(foods);
});

router.get("/foods/tags/:tagName", (req, res) => {
	const tagName = req.params.tagName;
	const foods = sample_foods.filter((food) => food.tags.includes(tagName));
	res.send(foods);
});

router.get("/foods/:foodId", (req, res) => {
	const foodId = req.params.foodId;
	const food = sample_foods.find((food) => food.id == foodId);
	res.send(food);
});

router.get("/foods/tags", (req, res) => {
	res.send(sample_tags);
});

router.get("/foods", (req, res) => {
	res.send(sample_foods);
});

router.post("/users/login", (req, res) => {
	const { email, password } = req.body;
	const user = sample_users.find((user) => user.email === email && user.password === password);

	if (user) {
		res.send(generateTokenResponse(user));
	} else {
		res.status(400).send("User name or password is not valid");
	}
});

const generateTokenResponse = (user: any) => {
	const token = jwt.sign(
		{
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: "30d",
		}
	);

	user.token = token;
	return user;
};

export default router;
