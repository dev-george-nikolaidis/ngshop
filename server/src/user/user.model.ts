import mongoose, { model } from "mongoose";
import { IUser } from "./user.interfaces";
const { Schema } = mongoose;

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		address: { type: String, required: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, required: true },
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

export const UserModel = model<IUser>("user", UserSchema);
