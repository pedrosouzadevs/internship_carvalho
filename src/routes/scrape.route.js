const route = require('express').Router();
const scrapeController = require('../controllers/scrape.controller');


route.get('/', scrapeController.scrape_amazon );


module.exports = route;
