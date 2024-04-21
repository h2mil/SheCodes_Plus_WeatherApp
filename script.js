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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "308ea326edf2b15o6tb4107799647841";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-column">
      <div class="weather-forecast-day">${formatDay(day.time)}</div>
      <div >
      <img src="${day.condition.icon_url}" class="weather-forecast-icon">
      </div>
      <div class="weather-forecast-maxi-mini">
      <div class="daily-max"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></div>
      <div class="daily-min">${Math.round(day.temperature.minimum)}°</div>
      </div></div>
      `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let forecastElement = document.querySelector("#forecast");
let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displaySubmitElement);

searchCity("Basel");
