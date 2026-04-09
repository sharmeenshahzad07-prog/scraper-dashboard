const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/products", (req, res) => {
  const data = JSON.parse(fs.readFileSync("../scraper/data.json"));
  res.json(data);
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});