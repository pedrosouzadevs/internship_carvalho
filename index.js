const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const scrapeRoute = require('./src/routes/scrape.route');

app.use("/", express.static(path.join(__dirname, 'views')));
app.use("/api/scrape", scrapeRoute);


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
