document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-button').addEventListener('click', function() {
      const query = document.getElementById('search-input').value.toLowerCase();
      fetchDataAndDisplayResults(query);
    });
  
    document.getElementById('reset-button').addEventListener('click', function() {
      clearResults();
      document.getElementById('search-input').value = '';
    });
  
    function fetchDataAndDisplayResults(query) {
      fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
          let results = [];
  
          // Check for beach recommendations
          if (query === 'beach' || query === 'beaches') {
            data.beaches.forEach(beach => {
              results.push({
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
              });
            });
          }
  
          // Check for temple recommendations
          if (query === 'temple' || query === 'temples') {
            data.temples.forEach(temple => {
              results.push({
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
              });
            });
          }
  
          // Check for country recommendations
          data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(query)) {
              country.cities.forEach(city => {
                results.push({
                  name: city.name,
                  imageUrl: city.imageUrl,
                  description: city.description
                });
              });
            }
          });
  
          displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  
    function displayResults(results) {
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
  
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
      }
  
      results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
  
        const image = document.createElement('img');
        image.src = result.imageUrl;
        image.alt = result.name;
  
        const name = document.createElement('h3');
        name.textContent = result.name;
  
        const description = document.createElement('p');
        description.textContent = result.description;
  
        resultItem.appendChild(image);
        resultItem.appendChild(name);
        resultItem.appendChild(description);
        resultsContainer.appendChild(resultItem);
      });
    }
  
    function clearResults() {
      document.getElementById('results').innerHTML = '';
    }
  });
  