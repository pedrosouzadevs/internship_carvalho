document.addEventListener('DOMContentLoaded', () => {
  const scrapeBtn = document.getElementById('scrapeBtn');
  const keywordInput = document.getElementById('keyword');
  const resultsDiv = document.getElementById('results');

// This function will check whether the input is empty, if not, this input will be added to the api url. With this url updated, a request will be made to the server to scrape this url, returning the page results.
scrapeBtn.addEventListener('click', async () => {
  const keyword = keywordInput.value.trim();
  if (keyword === '') {
    alert('Please enter a keyword.');
    return;
  }
  // Here we are making a request to the server to scrape the url with the keyword entered by the user.
  try {
    const response = await fetch(`/api/scrape?keyword=${keyword}`)
    .then(response => response.json())
    .then (data => displayResults(data))
    // If an error occurs when making this request, an alert will be issued asking the user to try again after a few seconds.
  } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again after a few seconds.');
    }
  });
  // This function will display the results of the request made to the server. This display is done in a table format, where each product will be displayed with its image, title, rating and reviews.
  function displayResults(data) {
    resultsDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        <tr id="result">
        </tr>
      </tbody>
    </table>
    `;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    // Here we are filtering the data so that only products with images are displayed and because inside the array data, we have some movies that don't have rating and reviews and I transformed they in value equal 0 and removed from the array if filter.
    data_selected = data.filter(product => !product.imageUrl == 0 )
    data_selected.map(product => {
      // To each product we are creating a table data with the image, title, rating and reviews.
      const productDiv = document.createElement('td');
      const image = product.imageUrl;
      const title = product.title;
      const rating = `Rating: ${product.rating ? product.rating + '/5' : 'N/A'}`;
      const reviews = `Reviews: ${product.reviews ? product.reviews : 'N/A'}`;
      // Here we are adding the image, title, rating and reviews to the productDiv to finally add to resultDiv.
      productDiv.innerHTML = `
        <img src="${image}" alt="" />
        <h4>${title}</h4>
        <p>${rating}</p>
        <p>${reviews}</p>
          `;
      resultDiv.appendChild(productDiv);
    });
  }
});
