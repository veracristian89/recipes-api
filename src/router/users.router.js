import { Router } from "express";
import userController from "../controller/users.controller.js";
import { token } from "../services/jwt.js";
export const router = Router();

router.get("/:id",token.verifyToken, userController.getById);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);