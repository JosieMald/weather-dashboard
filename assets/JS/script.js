// DOM ELEMENTS -----------------------------------------------------------------------------
var currentWeatherEl = $("#current-weather");
var currentTempEl = $("#current-temp");
var currentCityEl = $("#current-city");
var currentDateEl = $("#current-date");
var zipcodeEl = $(".zipcode");

// VARIABLES --------------------------------------------------------------------------------
var apiKey = "2524e9bb2b5f261c8205802844842a68";
var date = moment().format("dddd, D MMMM 'YY");

var weatherSvg = [
  {
    class: "sun",
    paths:
      "<circle cx='12' cy='12' r='4'></circle>" +
      "<path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7'" +
      "></path>",
  },
  {
    class: "cloud-rain",
    paths:
      "<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7'></path>" +
      "<path d='M11 13v2m0 3v2m4 -5v2m0 3v2'></path>",
  },
  {
    class: "cloud-storm",
    paths:
      "<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1'></path>" +
      "<polyline points='13 14 11 18 14 18 12 22'></polyline>",
  },
  {
    class: "cloud",
    paths:
      "<path d='M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 .996c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878'></path>",
  },
  {
    class: "snowflake",
    paths:
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72'></path>" +
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(60 12 12)'></path>" +
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(120 12 12)'></path>" +
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(180 12 12)'></path>" +
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(240 12 12)'></path>" +
    "<path d='M10 4l2 1l2 -1m-2 -2v6.5l3 1.72' transform='rotate(300 12 12)'></path>",
  },
  {
    class: "wind",
    paths:
    "<path d='M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24'></path>" +
    "<path d='M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24'></path>" +
    "<path d='M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24'></path>",
 
  },
  {
    class: "mist",
    paths: 
    "<path d='M5 5h3m4 0h9'></path>" +
    "<path d='M3 10h11m4 0h1'></path>" +
    "<path d='M5 15h5m4 0h7'></path>" +
    "<path d='M3 20h9m4 0h3'></path>", 
 
  }
];

var terms= "Clouds, Clear, Rain, Thunderstorm, Snow "

// FUNCTION CALLS ---------------------------------------------------------------------------
var getGeocoding = function (zipcode) {
  console.log("how");
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipcode +
    ",us&appid=" +
    apiKey;

  fetch(apiUrl).then(function (response) {
    // console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        var lon = data.coord.lon;
        var lat = data.coord.lat;
        var city = data.name;
        getForecast(lon, lat, city);
      });
    }
  });
};

var getForecast = function (lon, lat, city) {
  // console.log("far");
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
        var daily = data.daily;
        displayCurrentWeather(current, daily, city);
        // console.log(data.name);
        // console.log(Math.floor(data.main.temp));
        // console.log(data.weather[0].main)
      });
    }
  });
};

var displayCurrentWeather = function (current, daily, city) {
  // console.log("did i pass by here");
  var currentTemp = Math.floor(current.temp);
  currentTempEl.text(currentTemp + `\u00B0`);
  currentCityEl.text(city);
  currentDateEl.text(date);
  console.log(current.weather[0].description);
  displayForecast(daily);
  // console.log(daily[0].weather[0].main)
};

var displayForecast = function (daily) {
  // console.log("get");
  // console.log(daily);
  for (var i = 0; i < 5; i++) {
    var maxTemp = Math.floor(daily[i].temp.max);
    var minTemp = Math.floor(daily[i].temp.min);
    var weatherDesc = daily[i].weather[0].main
    console.log(i + ": " + weatherDesc);
    $(".forecast").append(
      "<div class='my-4 d-flex col-12 p-0'>" +
        "<p class='col-3'>Thursday</p>" +
        "<svg xmlns='http://www.w3.org/2000/svg'" +
        "class='icon icon-tabler icon-tabler-" +
        weatherSvg[0].class +
        " col-5'" +
        "width='40' height='40' viewBox='0 0 24 24'" +
        "stroke-width='2' stroke='currentColor'" +
        "fill='none' stroke-linecap='round' stroke-linejoin='round'>" +
        "<desc>" +
        "Download more icon variants from https://tabler-icons.io/i/" +
        weatherSvg[0].class +
        "</desc>" +
        "<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>" +
        weatherSvg[0].paths +
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
  console.log("clicked");
  var zipcode = zipcodeEl.val().trim();
  getGeocoding(zipcode);
});

// var getForecast = function (lon, lat) {
//     // use api url below to make one api call for the current weather and forecast.
// var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey

//     fetch(apiUrl).then(function (response){
//         if (response.ok) {
//             response.json().then(function (data){
//                 console.log(data);
//                 for (var i = 0; i < 5; i++){
//                     // console.log(Math.floor(data.daily[i].temp.temp));
//                     console.log(Math.floor(data.daily[i].temp.min));
//                     console.log(Math.floor(data.daily[i].temp.max));
//                     console.log(data.daily[i].weather[0].main)
//                     console.log("---------------------------------------------")
//                 }
//             })
//         }
//     })
// }

// "<svg xmlns='http://www.w3.org/2000/svg'" +
//           "class='icon icon-tabler icon-tabler-cloud-rain col-5'" +
//           "width='40' height='40' viewBox='0 0 24 24'" +
//           "stroke-width='2' stroke='currentColor'" +
//           "fill='none' stroke-linecap='round' stroke-linejoin='round'>" +
//           "<desc>" +
//             "Download more icon variants from https://tabler-icons.io/i/cloud-rain" +
//           "</desc>" +
//           "<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>" +
//           "<path d='M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7'></path>" +
//           "<path d='M11 13v2m0 3v2m4 -5v2m0 3v2'></path>" +
//         "</svg>" +
