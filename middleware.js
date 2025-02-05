import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

const mdlwre = (req, res, next) => {
  console.log("i am middleware");
  next();
};

app.use(mdlwre);
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;

  console.log(req.body);

  res.status(200).send({ answer: a + b });
});

app.listen(port, () => {
  console.log("running at port ", port);
});
