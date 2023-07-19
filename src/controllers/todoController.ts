import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Todo } from "../models/todoModel";
import * as joi from "joi";

const toDoSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  completed: joi.boolean(),
});

export const createTodo = async (req: Request, res: Response) => {
  const validationResult = await toDoSchema.validate(req.body);
  if (validationResult.error) {
    res.status(422).json(validationResult.error);
    return;
  }

  const { title, description, completed } = validationResult.value;
  console.log(req.body);
  try {
    const user = await User.findOne();
    if (user !== null) {
      const todo = new Todo({ title, description, completed, user: user._id });
      await todo.save();
      res.json({ todo: todo });
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne();
    if (user !== null) {
      const todo = await Todo.findOne({ _id: req.params.id, user: user._id });
      res.json({ todo: todo });
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized." });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const validationResult = await toDoSchema.validate(req.body);
  if (validationResult.error) {
    res.status(422).json(validationResult.error);
    return;
  }
  const { title, description, completed } = validationResult.value;
  try {
    const user = await User.findOne();
    if (user !== null) {
      const todo = await Todo.findOne({ _id: req.params.id, user: user._id });
      if (!todo) {
        res.status(404).json({ error: "TODO not found." });
        return;
      }
      todo.title = title;
      todo.description = description;
      todo.completed = completed;
      await todo.save();
      res.json({ todo: todo });
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized." });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.deleteOne({ _id: id });
    if (deletedTodo.deletedCount === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json({ message: "Todo deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
