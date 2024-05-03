document.addEventListener('DOMContentLoaded', () => {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const keywordInput = document.getElementById('keyword');
  const resultsDiv = document.getElementById('results');

  scrapeBtn.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    if (keyword === '') {
      alert('Please enter a keyword.');
      return;
    }

    try {
      const response = await fetch(`/api/scrape?keyword=${keyword}`)
      .then(response => response.json())
      .then (data => displayResults(data))
    } catch (error) {
      console.error('Error:', error);
    }
  });

  function displayResults(data) {
    resultsDiv.innerHTML = '';
    data.map(product => {
      const productDiv = document.createElement('div');

      const image = product.imageUrl;
      const title = product.title;
      const rating = `Rating: ${product.rating ? product.rating + '/5' : 'N/A'}`;
      const reviews = `Reviews: ${product.reviews ? product.reviews : 'N/A'}`;

      productDiv.innerHTML = `
          <li>
            <img src="${image}" alt="" />
            <h2>${title}</h2>
            <span>${rating}</span>
            <span>${reviews}</span>
          </li>
          `;
      resultsDiv.appendChild(productDiv);
    });
  }
});
