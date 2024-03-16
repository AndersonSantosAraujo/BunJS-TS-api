import express from "express";
import bodyParser from "body-parser";
import {
  createUserController,
  findOneUserController,
  listUsersController,
} from "./controllers/user.controller";
import { createTodoController } from "./controllers/todo.controller";
import { createCheckoutController } from "./controllers/checkout.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// home
app.get("/", (req, res) => {
  res.send("Welcome to Express API");
});

// users
app.get("/users", listUsersController);
app.get("/users/:userId", findOneUserController);
app.post("/users", createUserController);

// todos
app.post("/todos", createTodoController);

// payment
app.post("/checkout", createCheckoutController);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
