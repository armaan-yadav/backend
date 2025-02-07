import express from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "randomarmaanlovesjavascript";
const app = express();
app.use(express.json());

const users = [];

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token, JWT_SECRET);

  if (decodedInfo.username) {
    req.username = decodedInfo.username;
    next();
  } else {
    res.status(404).send({ message: "you're not logged in" });
  }
};

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((e) => e.username == username)) {
    res.send("Account already exists");
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed up",
  });

  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
  console.log(users);
});

app.get("/me", authMiddleware, function (req, res) {
  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == req.username) {
      foundUser = users[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "token invalid",
    });
  }
});

app.listen(3000); // that the http server is listening on port 3000
