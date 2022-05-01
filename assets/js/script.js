var apiKey = '19dc82681f3d9f94a404d90b4c15201e';

$('#submit-btn').click(function (event) {
    event.preventDefault();
    var cityName = event.currentTarget.parentElement[0].value;
    getApi(cityName);
});

function getApi(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("🚀 ~ file: script.js ~ line 19 ~ data", data)
            forecast((data[0].lat), (data[0].lon));
        });
}

function forecast(lat, lon) {
    var apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("🚀 ~ file: script.js ~ line 29 ~ data", data);
        })
}