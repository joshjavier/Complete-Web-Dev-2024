import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client('postgres://postgres@localhost:5432/world')
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function getVisitedCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUsers() {
  const result = await db.query("SELECT * FROM users")
  return result.rows
}

app.get("/", async (req, res) => {
  const countries = await getVisitedCountries();
  const users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find(u => u.id === currentUserId).color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const { user } = req.body
  if (user) {
    currentUserId = Number(user)
    res.redirect("/")
  } else {
    res.render("new.ejs")
  }
});

app.post("/new", async (req, res) => {
  const { name, color } = req.body

  try {
    const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id", [name, color])
    currentUserId = result.rows[0].id
    res.redirect("/")
  } catch (error) {
    console.error(error.name + ": " + error.message)
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
