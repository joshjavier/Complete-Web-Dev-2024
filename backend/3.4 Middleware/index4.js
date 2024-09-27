import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

app.post("/submit", (req, res) => {
  const bandName = req.body.street + req.body.pet;
  res.send(`<h1>Your band name is:</h1><h2>${bandName}</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
