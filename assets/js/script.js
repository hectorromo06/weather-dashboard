var apiKey = '19dc82681f3d9f94a404d90b4c15201e';
var citiesSearched = [];


$('#submit-btn').click(function (event) {
    event.preventDefault();
    var cityName = event.currentTarget.parentElement[0].value;

    if (cityName != "") {
        getApi(cityName);
    }
});

function getApi(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    var temp = localStorage.getItem('citiesSearched');
    var exists = false;

    if (temp != null) {
        citiesSearched = JSON.parse(temp);

        for (var i = 0; i < citiesSearched.length; i++) {
            console.log(i);
            if (citiesSearched[i].cityName == city) {
                exists = true;
                break;
            } else {
                exists = false;
            }
        }
    }

    console.log(exists);
    if (exists == false) {
        var occurence = {
            cityName: city
        }
        citiesSearched.push(occurence);
        localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
    } else {

    }

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecast((data[0].lat), (data[0].lon));
            fiveDay((data[0].lat), (data[0].lon));
        });
}

function forecast(lat, lon) {
    var apiCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial&exclude=hourly,daily,minutely';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("🚀 ~ file: script.js ~ line 57 ~ data", data);
        })
}

function fiveDay(lat, lon) {
    var apiCall = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial&cnt=5';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("🚀 ~ file: script.js ~ line 74 ~ data", data);
        })
}