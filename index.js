import express from "express";

const app = express();

//logial end point of the server or computer
//each port can be pointed to a different process running on the server
const port = 3000;

//app.get(path, callback function)

//callback function contains two things as arguments => req,res
// req used to acccess the data sent from the user
// res used to send the data back to the user against the request made

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/hey", (req, res) => {
  res.send("<h1>hey :)</h1>");
});
app.listen(port, () => {
  console.log("Express app is running on port :", port);
});
