import { Request, Response } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email, password });

	try {
		if (user) {
			res.status(200).json(generateTokenResponse(user));
		} else {
			res.status(400).send("User name or password is not valid");
		}
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

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

export const seedUsers = async (req: Request, res: Response) => {
	try {
		const foodsCount = await UserModel.countDocuments();
		if (foodsCount > 0) {
			res.send("Seed have been already processed");
			return;
		}

		await UserModel.create(sample_users);
		res.status(202).send("Seed successfully completed");
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};
