function updateTemperature(response) {
  let temperatureValue = document.querySelector("#temperature-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#current-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  temperatureValue.innerHTML = currentTemperature;
  currentCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  currentTime.innerHTML = formatDate(new Date());
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "308ea326edf2b15o6tb4107799647841";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateTemperature);
}

function displaySubmitElement(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displaySubmitElement);

searchCity("Basel");
