import express from "express";
import bodyParser from "body-parser";
import * as db from './db/index.js'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const { rows } = await db.query('SELECT EXISTS (SELECT 1 FROM users WHERE email = $1);', [username])
    const { exists: emailExists } = rows[0]

    if (emailExists) {
      return res.send('Email already exists. Try logging in.')
    }

    await db.query('INSERT INTO users (email, password) VALUES ($1, $2);', [username, password])
    res.render('secrets.ejs')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const { rows, rowCount } = await db.query('SELECT * FROM users WHERE email = $1;', [username])

    if (rowCount === 0) {
      return res.send('Account does not exist. Please register first.')
    }

    const user = rows[0]
    if (user.password !== password) {
      return res.send('Wrong password. Please try again.')
    }

    res.render('secrets.ejs')
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
