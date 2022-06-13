// DOM ELEMENTS -----------------------------------------------------------------------------
var currentWeatherEl = $("#current-weather");
var currentTempEl = $("#current-temp");
var currentCityEl = $("#current-city");
var currentDateEl = $("#current-date");
var zipcodeEl = $(".zipcode");


// VARIABLES --------------------------------------------------------------------------------
var apiKey = "2524e9bb2b5f261c8205802844842a68";
var date = moment().format("dddd, D MMMM 'YY");

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
    var currentTemp = Math.floor(current.temp);
    currentTempEl.text(currentTemp + `\u00B0`);
    currentCityEl.text(city)
    currentDateEl.text(date);
  console.log(current.weather[0].main);
  getForecast(daily);
  // console.log(daily[0].weather[0].main)
};



// EVENT LISTENERS --------------------------------------------------------------------------

$("#search-btn").on("click", function (event){
  event.preventDefault();
  console.log('clicked');
  var zipcode = zipcodeEl.val().trim();
  getGeocoding(zipcode);
})





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
