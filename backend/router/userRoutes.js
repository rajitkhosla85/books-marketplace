import express from "express"
import { loginUser, registerUser } from "../controller/userController.js"

const routes = express.Router();
routes.route("/login").post(loginUser);
routes.route("/signup").post(registerUser);

export default routes;