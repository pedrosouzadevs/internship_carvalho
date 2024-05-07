const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const scrapeRoute = require('./src/routes/scrape.route');

// We use express.static to serve our home page. And we use the scrapeRoute with the user input to scrape the Amazon website.
app.use("/", express.static(path.join(__dirname, 'views')));
app.use("/api/scrape", scrapeRoute);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
