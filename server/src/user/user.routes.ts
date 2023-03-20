import express from "express";
import * as userController from "./user.controller";
const router = express.Router();

router.post("/users/login", userController.loginUser);
router.get("/users/create/seed", userController.seedUsers);

export default router;
