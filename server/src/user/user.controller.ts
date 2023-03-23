import { Request, Response } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";
import { IUser } from "./user.interfaces";

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });
	try {
		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				id: user.id,
				email: user.email,
				name: user.name,
				address: user.address,
				isAdmin: user.isAdmin,
				token: generateToken(user.id),
			});
		} else {
			res.status(400).send("User name or password is not valid");
		}
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { name, email, password, address } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		if (user) {
			res.status(400).send("User is already exists!");
			return;
		} else {
			// handle user registration
			const encryptedPassword = await bcrypt.hash(password, 10);
			const self: IUser = {
				id: "",
				name,
				address,
				email: email.toLowerCase(),
				isAdmin: false,
				password: encryptedPassword,
			};

			const storedSelf = await UserModel.create(self);
			res.send(generateToken(storedSelf.id));
		}
	} catch (error: any) {
		res.status(400).send(error.message);
	}
};

// Generate JWT
const generateToken = (id: any) => {
	const jwtSecret = process.env.JWT_SECRET!;
	const jwtExpTime = process.env.JWT_TOKEN_EXPIRATION || 30;
	return jwt.sign({ id }, jwtSecret, {
		expiresIn: `${jwtExpTime}d`,
	});
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
