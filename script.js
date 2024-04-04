function displaySubmitElement(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", displaySubmitElement);
