var apiKey = '2524e9bb2b5f261c8205802844842a68';

// FUNCTION CALLS ---------------------------------------------------------------------------
var getGeocoding = function () {
    var zipcode = '30052';
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + apiKey;
    
    fetch(apiUrl).then(function (response){
        if (response.ok) {
            response.json().then(function (data){
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                // console.log(data);
                getCurrentWeather(lon, lat);
            })
        }
    })
};
getGeocoding();

var getCurrentWeather = function (lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

    fetch(apiUrl).then(function (response){
        if (response.ok) {
            response.json().then(function (data){
                // console.log(data);
                // console.log(data.name);
                // console.log(Math.floor(data.main.temp));
                // console.log(data.weather[0].main)
                getForecast(lon, lat);
            })
        }
    })
}

var getForecast = function (lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey

    fetch(apiUrl).then(function (response){
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);
                for (var i = 0; i < 5; i++){
                    // console.log(Math.floor(data.daily[i].temp.temp));
                    console.log(Math.floor(data.daily[i].temp.min));
                    console.log(Math.floor(data.daily[i].temp.max));
                    console.log(data.daily[i].weather[0].main)
                    console.log("---------------------------------------------")
                }
            })
        }
    })
}