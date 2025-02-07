import express from "express";
import { TodoModel, UserModel } from "./db.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const app = express();
const port = 5000;

mongoose.connect(
  "mongodb+srv://yadavarmaan10:RXkQxklsqfEuMlcJ@cluster0.mr66k.mongodb.net/todo-app-armaan"
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;

  try {
    await UserModel.create({ username, name, password });
    res.send({ message: "added successfully" });
  } catch (error) {
    console.log(error);
    res.send({ message: "something went wrong" });
  }
});
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
    password,
  });
  if (user) {
    const token = jwt.sign({ id: user._id.toString() }, "secret");
    res.status(200).send({ message: "signin successfull", token });
  } else {
    res.status(403).send({ message: "Incorrect credentials" });
  }
});

const auth = async (req, res, next) => {
  const { token } = req.headers;

  const { id } = jwt.verify(token, "secret");

  const user = await UserModel.findById(id);
  console.log("from mdlwr", user);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).send({ message: "invalid token" });
  }
};

app.post("/todo", auth, async (req, res) => {
  const { description, isCompleted, title } = req.body;
  const user = req.user;
  await TodoModel.create({
    description,
    isCompleted,
    title,
    userId: user._id,
  });

  res.send({ message: "todo added successfully" });
});
app.get("/todos", (req, res) => {});

app.listen(port, () => {
  console.log("Express app is running on port :", port);
});
