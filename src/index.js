// Feature #1
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

 let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let day = days[date.getDay()];
  dateToday = date.getDate();
  monthToday = months[date.getMonth()];

  return `${day} | ${dateToday} ${monthToday}`
}

function formatHours(timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10) {
     hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }

   return `${hours}:${minutes}`;
}

// Search Location

function showWeather(response) {

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  tempCelsius = Math.round(response.data.main.temp);
  let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = `${tempCelsius}`;

  let description = response.data.weather[0].main;
  let descWeather = document.querySelector("#description");
  descWeather.innerHTML = `${description}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let descWind = document.querySelector("#wind");
  descWind.innerHTML = `${windSpeed}`;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = Math.round(response.data.main.humidity);

  let time_now = document.querySelector("#current-time")
  time_now.innerHTML = formatHours(response.data.dt * 1000);

  let day_now = document.querySelector("#current-day")
  day_now.innerHTML = formatDate(response.data.dt * 1000);

  let iconMain = document.querySelector("#main-icon");

  if (description === "Rain") {
  iconMain.src="images/rain.png";
  } 
  if (description == "Clear") {
iconMain.src="images/sun.png"; 
}

if (description == "Clouds") {
iconMain.src="images/clouds.png"; 
}

if (description == "Thunderstorm") {
iconMain.src="images/storm.png"; 
}

if (description == "Snow") {
iconMain.src="images/snow.png"; 
}

if (description == "Drizzle") {
iconMain.src="images/drizzle.png"; 
}

if (description == "Atmosphere") {
iconMain.src="images/windy.png"; 
}

}

// Form Search City
 
function enterCity(city) {
  let apiKey = "5bed8f72cbd60b2d0edc71095210ab04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  enterCity(city);
}

// Current Location

function showCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5bed8f72cbd60b2d0edc71095210ab04";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlCurrent).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
  
}

navigator.geolocation.getCurrentPosition(showCoords);

function currentCity(current) {
  let apiKey = "5bed8f72cbd60b2d0edc71095210ab04";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${current.coords.latitude}&lon=${current.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);

}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// // Forecast

function showForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    let forecastMax = forecast.main.temp_max;
    let forecastMin = forecast.main.temp_min;
    forecastElement.innerHTML += `
    <li class ="forecast-block">
        <div id="sub-time">${formatHours(forecast.dt * 1000)}</div>
        <div id="sub-icon">
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
        </div>
                
    <div id="sub-temp"><strong> 
    ${Math.round(forecastMax)}°C </strong> | ${Math.round(forecastMin)}°C
                </div>
            </li>
  `;
  }
}

// Celsius - Farenheit conversion

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let tempChange = document.querySelector("#temp");
  let fahrenheitTemp = (tempCelsius * 9) / 5 + 32;
  tempChange.innerHTML = Math.round(fahrenheitTemp);

}

function displayCelsiusTemperature(event) {
  event.preventDefault();
 let tempChange = document.querySelector("#temp");
  tempChange.innerHTML = Math.round(tempCelsius);

}

let tempCelsius = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


// Colour Picker Buttons

function chBackcolorBlue() {
  document.body.style.background = "linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)";
  document.getElementById("current-button").style.background = "#1f3d88ab";
  document.getElementById("search-city").style.color = "#1f3c88";
  document.getElementById("go-button").style.background = "#1f3d88ab";
  document.getElementById("temp").style.color = "#1f3c88";
  document.getElementById("temp-change").style.color = "#1f3c88";
 
}

let blueButton = document.querySelector(".blue");
blueButton.addEventListener("click", chBackcolorBlue);

function chBackcolorYellow() {
  document.body.style.background = "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)";
  document.getElementById("current-button").style.background = "#f35010a6";
  document.getElementById("search-city").style.color = "#f35010";
  document.getElementById("go-button").style.background = "#f35010a6";
  document.getElementById("temp").style.color = "#f35010";
  document.getElementById("temp-change").style.color = "#f35010a6";
  
}

let yellowButton = document.querySelector(".yellow");
yellowButton.addEventListener("click", chBackcolorYellow);

function chBackcolorOrange() {
  document.body.style.background = "linear-gradient(to top, #cc208e 0%, #6713d2 100%)";
  document.getElementById("current-button").style.background = "#892cdc";
  document.getElementById("search-city").style.color = "#892cdc";
  document.getElementById("go-button").style.background = "#892cdc";
  document.getElementById("temp").style.color = "#892cdc";
  document.getElementById("temp-change").style.color = "#892cdc";
}

let orangeButton = document.querySelector(".orange");
orangeButton.addEventListener("click", chBackcolorOrange);