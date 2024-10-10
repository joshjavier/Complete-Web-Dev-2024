import express from "express";
import axios, { AxiosError } from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "joshjavier";
const yourPassword = "secret";
const yourAPIKey = "616a1ef6-b606-4208-8a33-1385f8ee0602";
const yourBearerToken = "8d7ff05e-b682-4b94-9ceb-923b3c12828d";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res, next) => {
  try {
    const response = await axios.get(`${API_URL}/rando`);
    res.render('index.ejs', { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.get("/basicAuth", async (req, res, next) => {
  try {
    const url = `${API_URL}/all?page=2`;
    const config = {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    };
    const response = await axios.get(url, config);
    res.render('index.ejs', { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.get("/apiKey", async (req, res, next) => {
  try {
    const url = `${API_URL}/filter?score=5&apiKey=${yourAPIKey}`;
    const response = await axios.get(url);
    res.render('index.ejs', { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.get("/bearerToken", async (req, res, next) => {
  try {
    const url = `${API_URL}/secrets/42`;
    const config = {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    };
    const response = await axios.get(url, config);
    res.render('index.ejs', { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof AxiosError) {
    console.error('Error: ', err.message);

    if (err.response) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
    }

    res.status(500).send('Failed to make request');
    return;
  }

  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
