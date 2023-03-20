import { Request, Response } from "express";
import { sample_foods } from "../data";
import { FoodModel } from "./food.model";

export const searchFoodByParam = async (req: Request<{ searchParam: string }>, res: Response) => {
	// 'i' means that we make the regexp string case incentive
	const searchRegex = new RegExp(req.params.searchParam, "i");
	try {
		const foods = await FoodModel.find({
			name: { $regex: searchRegex },
		});
		res.status(200).send(foods);
	} catch (error) {
		res.send(error);
	}
};

export const searchFoodByTag = async (req: Request, res: Response) => {
	// const searchTerm = req.params["searchParam"];
	try {
		const tagName = req.params.tagName;
		const foods = await FoodModel.find({
			tags: tagName,
		});
		res.status(200).send(foods);
	} catch (error) {
		res.send(error);
	}
};

export const searchFoodById = async (req: Request, res: Response) => {
	const foodId = req.params.foodId;
	try {
		const food = await FoodModel.findById(foodId);
		res.send(food);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const getTags = async (req: Request, res: Response) => {
	try {
		const tags = await FoodModel.aggregate([
			{
				$unwind: "$tags",
			},
			{
				$group: {
					_id: "$tags",
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					name: "$tags",
					count: "$count",
				},
			},
		]).sort({ count: -1 });

		const all = {
			name: "All",
			count: await FoodModel.countDocuments,
		};

		tags.unshift(all);
		res.send(tags);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const getFoods = async (req: Request, res: Response) => {
	try {
		const foods = await FoodModel.find();
		res.send(foods);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const seedFoods = async (req: Request, res: Response) => {
	try {
		const foodsCount = await FoodModel.countDocuments();
		if (foodsCount > 0) {
			res.send("Seed have been already processed");
			return;
		}

		await FoodModel.create(sample_foods);
		res.status(202).send("Seed successfully completed");
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};
