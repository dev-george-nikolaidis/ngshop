import mongoose, { model, Schema, Types } from "mongoose";
import { OrderStatus } from "../constants/order-status";
import { IFood } from "../food/food.interfaces";
import { FoodSchema } from "../food/food.model";
export interface LatLng {
	lat: string;
	lng: string;
}

export const LatLngSchema = new Schema<LatLng>({
	lat: { type: String, required: true },
	lng: { type: String, required: true },
});

export interface IOrderItem {
	food: IFood;
	price: number;
	quantity: number;
}

export const OrderItemSchema = new Schema<IOrderItem>({
	food: { type: FoodSchema, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

export interface IOrder {
	id: number;
	items: IOrderItem[];
	totalPrice: number;
	name: string;
	address: string;
	addressLatLng?: LatLng;
	paymentId: string;
	status: OrderStatus;
	user: Types.ObjectId;
	createdAt: string;
	updatedAt: string;
}

const OrderSchema = new Schema<IOrder>(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		addressLatLng: { type: LatLngSchema, required: true },
		paymentId: { type: String },
		totalPrice: { type: Number, required: true },
		items: { type: [OrderItemSchema], required: true },
		status: { type: String, default: OrderStatus.NEW },
		user: { type: Schema.Types.ObjectId, require: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

export const OrderModel = model("oder", OrderSchema);
