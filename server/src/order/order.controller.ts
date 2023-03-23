import { Request, Response } from "express";
import { OrderStatus } from "../constants/order-status";
import { IOrder, OrderModel } from "./order.model";

export const createOrder = async (req: Request<{}, never, IOrder>, res: Response) => {
	const requestOrder = req.body;

	if (requestOrder.items.length <= 0) {
		res.status(404).send("Cart is empty");
		return;
	}

	try {
		await OrderModel.deleteOne({
			user: req.body.user.id,
			stratus: OrderStatus.NEW,
		});

		const newOrder = new OrderModel({ ...requestOrder, user: req.body.user.id });
		await newOrder.save();

		res.status(200).send(newOrder);
	} catch (error) {
		res.send(error);
	}
};
