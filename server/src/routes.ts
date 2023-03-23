import express from "express";
const router = express.Router();

import foodRouter from "./food/food.routes";
import userRouter from "./user/user.routes";
import orderRouter from "./order/order.routes";

router.use("/foods", foodRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);

export default router;
