const route = require('express').Router();
const scrapeController = require('../controllers/scrape.controller');

// Here we are importing the scrapeController and using the scrape_amazon function from it.
route.get('/', scrapeController.scrape_amazon );


module.exports = route;
