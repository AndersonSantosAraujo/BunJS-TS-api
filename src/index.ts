import express from "express";
import bodyParser from "body-parser";
import {
  createUserController,
  findOneUserController,
  listUsersController,
} from "./controllers/user.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Express API");
});

app.get("/users", listUsersController);

app.get("/users/:userId", findOneUserController);

app.post("/users", createUserController);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
