import express from "express";

const app = express();
const port = 3000;

const mdlwre = (req, res, next) => {
  console.log("i am middleware");
  next();
};

app.use(mdlwre);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("running at port ", port);
});
