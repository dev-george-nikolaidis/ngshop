import mongoose, { model } from "mongoose";
import { IFood } from "./food.interfaces";
const { Schema } = mongoose;

export const FoodSchema = new Schema<IFood>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		tags: { type: [String], required: true },
		favorite: { type: Boolean, default: false },
		stars: { type: Number, required: true },
		imageUrl: { type: String, required: true },
		origins: { type: [String], required: true },
		cookTime: { type: String, required: true },
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
		timestamps: true,
	}
);

export const FoodModel = model<IFood>("foods", FoodSchema);
