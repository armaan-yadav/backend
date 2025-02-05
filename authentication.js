import express from "express";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
const JWT_SECRET = "ilovejavascript";

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

  //   const token = generateToken();
  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );
  console.log(users);
  res.send({ token: token });
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  const { username } = jwt.verify(token, JWT_SECRET);
  const user = users.find((e) => e.username == username);

  if (user) {
    res.send({ username: user.username, message: "Namaste <3" });
  } else {
    res.send({ message: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log("app is running on port ", port);
});

// tokens are stateful
// jwt are stateless
// jwt saves on round trip to database for verifying the user authenticity
// jwt is not encryption but it's encoding

// jwt.sign({},JWT_SECRET)
// jwt.verify(jwtToken,JWT_SECRET)
