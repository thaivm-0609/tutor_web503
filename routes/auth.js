import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/signup", authController.signUp); //dang ky
authRoute.post("/signin", authController.signIn); //dang nhap

export default authRoute;