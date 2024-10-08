import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { rng } from "./utils.js";

const app = express();
const port = 3000;
const baseUrl = "https://bored-api.appbrewery.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/random`);
    res.render("index.ejs", { data: response.data });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response.status === 404) {
      errorMessage = "No activities match your criteria.";
    }

    console.error("Failed to make request:", errorMessage);
    res.render("index.ejs", {
      error: errorMessage,
    });
  }
});

app.post("/", async (req, res) => {
  const { type, participants } = req.body;

  let url, pickRandom = false;

  if (!type && !participants) {
    url = `${baseUrl}/random`;
  } else {
    const params = new URLSearchParams(req.body);
    url = `${baseUrl}/filter?${params.toString()}`;
    pickRandom = true;
  }

  try {
    const response = await axios.get(url);

    let { data } = response;
    if (pickRandom) {
      data = response.data[rng(response.data.length)];
    }

    res.render("index.ejs", { data });
  } catch (error) {
    let errorMessage = error.message;
    if (error.response.status === 404) {
      errorMessage = "No activities match your criteria.";
    }

    console.error("Failed to make request:", errorMessage);
    res.render("index.ejs", {
      error: errorMessage,
    });
  }

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
