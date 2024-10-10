import express from "express";
import axios, { AxiosError } from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

const yourBearerToken = "8d7ff05e-b682-4b94-9ceb-923b3c12828d";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res, next) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    next(error);
  }
});

app.post("/post-secret", async (req, res, next) => {
  try {
    const url = `${API_URL}/secrets`;
    const { secret, score } = req.body;
    const response = await axios.post(url, { secret, score }, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.post("/put-secret", async (req, res, next) => {
  const searchId = req.body.id;
  try {
    const url = `${API_URL}/secrets/${searchId}`;
    const { secret, score } = req.body;
    const response = await axios.put(url, { secret, score }, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.post("/patch-secret", async (req, res, next) => {
  const { id: searchId, ...data } = req.body;
  try {
    const url = `${API_URL}/secrets/${searchId}`;
    const response = await axios.patch(url, data, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

app.post("/delete-secret", async (req, res, next) => {
  const searchId = req.body.id;
  try {
    const url = `${API_URL}/secrets/${searchId}`;
    const response = await axios.delete(url, config);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    next(error);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  let content = 'Unknown error occurred';

  if (err instanceof AxiosError) {
    content = JSON.stringify(err.response.data);
  }

  res.render("index.ejs", { content });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
