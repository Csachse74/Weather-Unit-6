$("#search").on('click', function() {
    var city = $('#city').val()
    getCity(city);
    var tempLS = JSON.parse(localStorage.getItem('searchHistory'));
    if (tempLS == null) {
        tempLS = [];
    }
    tempLS.unshift(city);
    if (tempLS.length >= 8) {
        tempLS.pop()
    }
    localStorage.setItem('searchHistory', JSON.stringify(tempLS));
    var list = document.querySelector('#buttonList');
    list.innerHTML = '';
    getButtons();
})
getButtons();
function getButtons() {
    var list = document.querySelector('#buttonList');
    // list.removeChild();
    var tempLS = JSON.parse(localStorage.getItem('searchHistory'));
    for (var i = 0; i < tempLS.length; i++) {
        var temp = tempLS[i];
        var tempB = document.createElement('button');
        tempB.setAttribute('temp', temp);
        tempB.setAttribute('onclick', "getClickCity(this.getAttribute('temp'))")
        tempB.setAttribute('class', 'col-12')
        tempB.innerHTML = temp.toUpperCase();
        list.appendChild(tempB);
    }
}

function getClickCity(city) {
    getCity(city);
}

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
        var icon = response.weather[0].icon;
        var iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        $('#icon').attr('src', iconURL);
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
        $('#cityUV').text(response.daily[0].uvi);
        
        setForecast(response);
    });
}
// getCity();
$('#date').text(moment().format('M/DD/YYYY'))

function setForecast(response) {
    for (var i = 1; i < 6; i++) {
        var unix = moment.unix(response.daily[i].dt);
        var icon = response.daily[i].weather[0].icon;
        var iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        $('#date' + i).text(unix.format('M/DD/YYYY'));
        $('#icon' + i).attr('src', iconURL);
        $('#minTemp' + i).text(response.daily[i].temp.min);
        $('#maxTemp' + i).text(response.daily[i].temp.max);
        $('#Wind' + i).text(response.daily[i].wind_speed);
        $('#Humid' + i).text(response.daily[i].humidity);
    }
}