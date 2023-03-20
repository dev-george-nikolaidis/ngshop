import express from "express";
import * as foodController from "./food.controller";

const router = express.Router();

router.get("/search/:searchParam", foodController.searchFoodByParam);

router.get("/tags/:tagName", foodController.searchFoodByTag);

router.get("/:foodId", foodController.searchFoodById);

router.get("/tags", foodController.getTags);

router.get("/create/seed", foodController.seedFoods);

router.get("/", foodController.getFoods);

export default router;
