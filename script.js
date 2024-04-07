function updateTemperature(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureValue = document.querySelector("#temperature-value");
  temperatureValue.innerHTML = currentTemperature;
}

function searchCity(city) {
  let apiKey = "308ea326edf2b15o6tb4107799647841";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateTemperature);
}

function displaySubmitElement(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displaySubmitElement);

searchCity("Basel");
