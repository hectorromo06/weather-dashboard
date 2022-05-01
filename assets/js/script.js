var lat;
var lon;
var apiKey = '19dc82681f3d9f94a404d90b4c15201e';
var apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

$('.submit-btn').click(function (event) {
    event.preventDefault();
    console.log("🚀 ~ file: script.js ~ line 7 ~ event", event);
});