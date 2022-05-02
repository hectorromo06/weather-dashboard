var apiKey = '19dc82681f3d9f94a404d90b4c15201e';
var cityNameEl = document.querySelector('#city-name');
var iconEl = document.querySelector('#weather-icon');
var temperatureEl = document.querySelector('#temperature');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var UVindEl = document.querySelector('#uv-index');
var citiesSearched = [];

// event listener for submit button
$('#submit-btn').click(function (event) {
    event.preventDefault();
    var cityName = event.currentTarget.parentElement[0].value;

    if (cityName != "") {
        getApi(cityName);
    }
});

function getApi(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    cityNameEl.innerHTML = city + ' ' + '(<span id="date"></span>)';
    $('#date').text(moment().format("L"));

    // checks if localStorage exists
    var temp = localStorage.getItem('citiesSearched');
    var exists = false;

    // if localStorage does exist, make sure cityName is not duplicated
    if (temp != null) {
        citiesSearched = JSON.parse(temp);

        for (var i = 0; i < citiesSearched.length; i++) {
            if (citiesSearched[i].cityName == city) {
                exists = true;
                break;
            } else {
                exists = false;
            }
        }
    }

    // if cityName doesn't exist in array, adds it, creates localStorage
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

// API call for current conditions
function forecast(lat, lon) {
    var apiCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial&exclude=hourly,daily,minutely';

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // display current values
            temperatureEl.textContent = data.current.temp;
            windEl.textContent = data.current.wind_speed;
            humidityEl.textContent = data.current.humidity;
            UVindEl.textContent = data.current.uvi;

            if (data.current.uvi <= 2) {
                UVindEl.classList.add('success')
            } else if (data.current.uvi > 2 && data.current.uvi <= 7) {
                UVindEl.classList.add('uk-text-warning')
            } else if (data.current.uvi > 7 && data.current.uvi <= 11) {
                UVindEl.classList.add('uk-text-danger')
            }

            iconEl.src = 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png'
        })
}

// API call for future conditions
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