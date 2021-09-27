$("#search").on('click', function() {
    var city = $('#city').val()
    getCity(city);
})

function setCurrentDay(response) {
    $('#currentCity').text(response.name);
    $('#cityTemp').text(response.main.temp);
    $('#cityWind').text(response.wind.speed);
    $('#cityHumid').text(response.main.humidity);
}

function getCity(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=49bd819e8e8a63881df258b523b7f2cf';

    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(function (response) {
        console.log(response.coord.lat);
        console.log(response.coord.lon);
        console.log(response);
        setCurrentDay(response);
        getWeek(response.coord.lat, response.coord.lon);
    });
}


function getWeek(lat, lon) {
    var requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&exclude=hourly,minutely&appid=7563799c4abe9a09c92d23a0f1b3ecc8';

    $.ajax({
        url: requestUrl2,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
    });
}
// getCity();