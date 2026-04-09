const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://books.toscrape.com/";

async function scrapeData() {
  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  let products = [];

  $(".product_pod").each((i, el) => {
    if (i < 15) {
      const title = $(el).find("h3 a").attr("title");
      const price = $(el).find(".price_color").text();

      products.push({ title, price });
    }
  });

  fs.writeFileSync("data.json", JSON.stringify(products, null, 2));
  console.log("Data scraped and saved!");
}


scrapeData();
const cron = require("node-cron");

// har 1 minute run (test ke liye)
cron.schedule("* * * * *", () => {
  console.log("Running cron job...");
  scrapeData();
});