import express from "express";
const router = express.Router();

import foodRouter from "./food/food.routes";
import userRouter from "./user/user.routes";

router.use("/foods", foodRouter);
router.use("/users", userRouter);

export default router;
