import express from "express";
import { v4 } from "uuid";

const app = express();
const port = 3000;

// *Functions
function generateToken() {
  const token = v4();
  return token;
}

// *DATA
const users = [];

// *Middelewares
app.use(express.json());

// *Route-handlers
app.get("/", (req, res) => {
  res.status(200).send({ message: "hello world" });
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  //check if user  already exists
  if (users.find((e) => e.username == username)) {
    res.send({ message: "Account already exists" });
  } else {
    users.push({
      username,
      password,
    });
    res.send({ message: "Account created successfully" });
    console.log(users);
  }
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((e) => e.username == username);

  if (!user) {
    res.send({ message: "User does not exist" });
  }

  if (user.password !== password) {
    res.send({ message: "Incorrect password" });
  }

  const token = generateToken();
  user.token = token; //objects stored by ref so it directly mutates the global users array
  console.log(users);
  res.send({ token: token });
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  const user = users.find((e) => e.token == token);

  if (user) {
    res.send({ username: user.username, message: "Namaste <3" });
  } else {
    res.send({ message: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log("app is running on port ", port);
});
