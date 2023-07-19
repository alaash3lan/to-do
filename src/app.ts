import express from "express";
import mongoose from "mongoose";
import { todoRoutes } from "./routes/todoRoutes";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/userRoutes";
import auth from "./middleware/auth";

const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/todo", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/todos",auth, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
