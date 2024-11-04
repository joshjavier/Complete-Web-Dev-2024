import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client("postgres://postgres@localhost:5432/world");

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  const countries = result.rows.map(c => c.country_code);
  // db.end();

  res.render("index.ejs", {
    countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const { country } = req.body;

  // Get the corresponding country code
  const result = await db.query(`SELECT country_code FROM countries WHERE country_name ILIKE '${country}%'`);
  const country_code = result.rows[0]?.country_code;

  // Add country code to visited_countries table
  await db.query(`INSERT INTO visited_countries (country_code) VALUES ('${country_code}')`);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
