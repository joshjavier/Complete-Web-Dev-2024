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

  try {
    // Get the corresponding country code
    const result = await db.query('SELECT country_code FROM countries WHERE country_name ILIKE $1', [country]);

    // Add country code to visited_countries table
    if (result.rowCount) {
      const country_code = result.rows[0].country_code;
      await db.query('INSERT INTO visited_countries (country_code) VALUES ($1)', [country_code]);
    }
  } catch (error) {
    if (error.message.includes('duplicate key value')) {
      console.log(error.detail)
    } else {
      console.error(error.name + ': ' + error.message)
      console.log(error)
    }
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
