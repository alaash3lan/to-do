import express from "express";

import { login, register, logout } from "../controllers/userController";

export const userRoutes = express.Router();
userRoutes.post("/login", login);
userRoutes.post("/register", register);
userRoutes.post("/logout", logout);
