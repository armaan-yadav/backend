import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const port = 4000;

const users = [];

app.use(express.json());
const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const info = jwt.verify(token, "ilovejs");

  const user = users.find((e) => e.email == info.email);

  if (user) {
    req.email = info.email;
    next();
  } else {
    res.status(404).send({ message: "invalid token" });
  }
};

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //   check if already exists

  const user = users.find((e) => e.email == email);

  if (user) {
    res.status(404).send({ message: "email already exists" });
  }

  users.push({ email, password });

  res.status(200).send({ message: "account created successfully" });
  console.log(users);
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if account  exists
  const user = users.find((e) => e.email == email);

  if (!user) {
    res.status(404).send({ message: "email not registsred" });
  }

  if (user.password !== password) {
    res.status(404).send({ message: "incorrect password" });
  }

  const token = jwt.sign(email, "ilovejs");
  user.jwt = token;

  console.log(users);
  res.status(200).send({ message: "sign in successfullly", token });
});

app.get("/me", authMiddleware, (req, res) => {
  const email = req.email;

  res.send({ email, message: "your information" });
});
app.listen(port, () => {
  console.log("app running on port ", port);
});
