import express from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  getAllTodos,
} from "../controllers/todoController";

export const todoRoutes = express.Router();
todoRoutes.post("/", createTodo);
todoRoutes.get("/:id", getTodo);
todoRoutes.put("/:id", updateTodo);
todoRoutes.delete("/:id", deleteTodo);
todoRoutes.get("/", getAllTodos);
