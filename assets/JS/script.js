// DOM ELEMENTS -----------------------------------------------------------------------------
var currentWeatherEl = $("#current-weather");
var currentTempEl = $("#current-temp");
var currentCityEl = $("#current-city");
var currentDateEl = $("#current-date");
var zipcodeEl = $(".zipcode");

// VARIABLES --------------------------------------------------------------------------------
var apiKey = "2524e9bb2b5f261c8205802844842a68";
var date = moment().format("dddd, D MMMM 'YY");
let weatherDesc;
let weather;
let paths;
let bypass = false;
let counter = 0;
let forecastArray = [];
let dailyWeather;
let day = moment().isoWeekday();
let fiveDays = moment().isoWeekday(day);

// FUNCTION CALLS ---------------------------------------------------------------------------
var getGeocoding = function (zipcode) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipcode +
    ",us&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var lon = data.coord.lon;
        var lat = data.coord.lat;
        var city = data.name;
        zipcodeEl.val("");
        getForecast(lon, lat, city);
      });
    }
  });
};

var getForecast = function (lon, lat, city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&exclude=minutely,hourly,alerts&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var current = data.current;
        dailyWeather = data.daily;
        weatherDesc = current.weather[0].main;
        svgSwitchStatement(current, city);
      });
    }
  });
};

var svgSwitchStatement = function (current, city) {
  if (bypass === false) {
    counter++;
  } else {
    counter = 5;
  }
  for (var i = 0; i < counter; i++) {
    if (bypass === true) {
      weatherDesc = dailyWeather[i].weather[0].main;
    }
    switch (weatherDesc) {
      case "Clouds":
        weather = "cloud";
        paths =
          "<path d='M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 .996c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878'></path>";
        break;
      case "Clear":
        weather = "sun";
        paths =
          "<circle cx='12' cy='12' r='4'></circle>" +
          "<path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7'></path>";
        break;
      case "Rain":
        weather = "cloud-rain";
        paths =
          "<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7'></path>" +
          "<path d='M11 13v2m0 3v2m4 -5v2m0 3v2'></path>";
        break;
      case "Thunderstorm":
        weather = "cloud-storm";
        paths =
          "<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1'></path>" +
          "<polyline points='13 14 11 18 14 18 12 22'></polyline>";
      case "Snow":
        weather = "snowflake";
        paths =
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72'></path>" +
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(60 12 12)'></path>" +
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(120 12 12)'></path>" +
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(180 12 12)'></path>" +
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(240 12 12)'></path>" +
          "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(300 12 12)'></path>";
    }
    if (bypass === true) {
      let weatherObj = {
        class: weather,
        paths: paths,
      };
      forecastArray.push(weatherObj);
    }
  }
  if (bypass === false) {
    displayCurrentWeather(current, city);
  } else {
    displayForecast();
  }
};

var displayCurrentWeather = function (current, city) {
  bypass = true;
  var currentTemp = Math.floor(current.temp);
  currentTempEl.text(currentTemp + `\u00B0`);
  currentCityEl.text(city);
  currentDateEl.text(date);
  $(".weather-content").append(
    "<svg xmlns='http://www.w3.org/2000/svg'" +
      "class='day-icons icon icon-tabler icon-tabler-" +
      weather +
      " text-white col-12' id='weather-icon' " +
      "width='80' height='80' viewBox='0 0 24 24'" +
      "stroke-width='2' stroke='currentColor'" +
      "fill='none' stroke-linecap='round' stroke-linejoin='round'>" +
      "<desc>" +
      "Download more icon variants from https://tabler-icons.io/i/" +
      weather +
      "</desc>" +
      "<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>" +
      paths +
      "</svg>"
  );
  svgSwitchStatement();
};

var displayForecast = function () {
  for (var i = 0; i < 5; i++) {
    var maxTemp = Math.floor(dailyWeather[i].temp.max);
    var minTemp = Math.floor(dailyWeather[i].temp.min);
    day++;
    if (day == 7) {
      day = 0;
    }
    let weekday = fiveDays._locale._weekdays[day];
    $(".forecast").append(
      "<div class='my-4 d-flex col-12 p-0'>" +
        "<p class='col-3'>" +
        weekday +
        "</p>" +
        "<svg xmlns='http://www.w3.org/2000/svg'" +
        "class='day-icons icon icon-tabler icon-tabler-" +
        forecastArray[i].class +
        " col-5'" +
        "width='40' height='40' viewBox='0 0 24 24'" +
        "stroke-width='2' stroke='currentColor'" +
        "fill='none' stroke-linecap='round' stroke-linejoin='round'>" +
        "<desc>" +
        "Download more icon variants from https://tabler-icons.io/i/" +
        forecastArray[i].class +
        "</desc>" +
        "<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>" +
        forecastArray[i].paths +
        "</svg>" +
        "<p class='col-2 p-0'>H: " +
        maxTemp +
        "</p>" +
        "<p class='col-2 p-0'>L: " +
        minTemp +
        "</p>" +
        "</div>"
    );
  }
};

// EVENT LISTENERS --------------------------------------------------------------------------

$("#search-btn").on("click", function (event) {
  event.preventDefault();
  if (bypass === true) {
    // debugger;
    forecastArray = [];
    $("svg").remove(".day-icons");
    $(".forecast").text("");
    console.log("clicked");
    bypass = false;
  }

  var zipcode = zipcodeEl.val().trim();
  getGeocoding(zipcode);
});
