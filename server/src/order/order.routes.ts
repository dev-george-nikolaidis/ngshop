import express from "express";
import auth from "../middlewares/auth";
const router = express.Router();
import * as oderController from "./order.controller";

router.post("/create", auth, oderController.createOrder);

export default router;
