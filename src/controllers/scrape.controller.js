

const scrape_amazon = async (req, res) => {
  const axios = require('axios');
  const { JSDOM } = require('jsdom');
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  } else {
    axios.get(`https://www.amazon.com.br/s?k=${keyword}`)
      .then(response => {
        const { document } = new JSDOM(response.data).window;
        const products = Array.from(document.querySelectorAll('.sg-col-4-of-24.sg-col-4-of-12.s-result-item'));

        const extractedData = products.map(product => {
          if (product.querySelector('[data-cy="delivery-recipe"]')) {
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
            const title = 0
            const rating = 0
            const reviews = 0
            const imageUrl = 0
            return { title, rating, reviews, imageUrl };
          }

        });

        res.json(extractedData);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  }

module.exports = {scrape_amazon};
