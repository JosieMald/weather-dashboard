var apiKey = '2524e9bb2b5f261c8205802844842a68';

// FUNCTION CALLS ---------------------------------------------------------------------------
var getGeocoding = function () {
    var city = 'atlanta';
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
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
                console.log(data);
            })
        }
    })
}
