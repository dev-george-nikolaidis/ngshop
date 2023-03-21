import express from "express";
import * as userController from "./user.controller";
const router = express.Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/create/seed", userController.seedUsers);

export default router;
