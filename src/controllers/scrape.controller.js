const scrape_amazon = async (req, res) => {
  const axios = require('axios');
  const { JSDOM } = require('jsdom');
  const keyword = req.query.keyword;
  // Check if the keyword is provided.
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  } else {
    // Scrape the Amazon website using the provided keyword and axios.
    axios.get(`https://www.amazon.com.br/s?k=${keyword}`)
      .then(response => {
        const { document } = new JSDOM(response.data).window;
        const products = Array.from(document.querySelectorAll('.sg-col-4-of-24.sg-col-4-of-12.s-result-item'));
        // Here we extract the data we need from the scraped HTML and create an array of objects.
        const extractedData = products.map(product => {
          // Check if the product has the data-cy in the object, because we are removing the movies that don't have reviews and rating, and movies don't have data-cy.
          if (product.querySelector('[data-cy="delivery-recipe"]')) {
            // We extract the title, rating, reviews, and image URL of the product.
            const titleElement = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal');
            const title = titleElement ? titleElement.textContent.trim() : '';

            const ratingElement = product.querySelector('.a-icon-alt');
            const rating = ratingElement ? ratingElement.textContent.match(/^[0-9],[0-9]/) : "N/A";

            const reviewsElement = product.querySelector('.a-size-base');
            const reviews = reviewsElement ? parseInt(reviewsElement.textContent.replace(/[^\d]/g, '')) : "N/A";
            const imageElement = product.querySelector('img');
            const imageUrl = imageElement ? imageElement.src : '';

            return { title, rating, reviews, imageUrl };
          } else {
            // And if the product is a movie we return an object with the title, rating, reviews, and image URL as 0.
            const title = 0
            const rating = 0
            const reviews = 0
            const imageUrl = 0
            return { title, rating, reviews, imageUrl };
          }

        });
        // Return the extracted data as a JSON response.
        res.json(extractedData);
      })
      .catch(error => {
        // If an error occurs, we log the error and return a 500 status code with an error message.
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  }
//  Export the scrape_amazon function to use in the scrape routes.
module.exports = {scrape_amazon};
