var searchInputField = $("#city-search-input");
var searchButton = $("#search-bttn");
var currentDayCard = $("#current-day-card")
var cityListEl = $("#city-list");
var cityNameEl = $(".city-name")

var currentTemperature = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWind = $("#current-wind");
var currentUvIndex = $("#current-uv")

var dateElArray = $(".date")
var forecastTempArray =$(".forecast-temp");
var forecastHumidityArray = $(".forecast-humidity");
var forecastWindArray = $(".forecast-wind");
var weatherDisplayCards = $(".with-icon")
var icon = $(".icon")


var cityArray = []
// var storedCityArray = JSON.parse(localStorage.getItem('city names'));


var apiKey = "4c0ee78030e85f87dd27ff63df4ab854"
    


function getApi(source) {

    var apiKey = "4c0ee78030e85f87dd27ff63df4ab854"
    var apiCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + source + "&appid=" + apiKey
    console.log(apiCityUrl);

    fetch (apiCityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var cityName = data.name 
            var storedCityArray = JSON.parse(localStorage.getItem('city names'));


            if (cityName !== "Atlanta" && $.inArray(cityName, storedCityArray) === -1){
                storedCityArray.push(cityName);
                localStorage.setItem('city names', JSON.stringify(storedCityArray))
                var newCityButton = $("<button></button>").text(cityName)
                newCityButton.addClass("list-group-item list-group-item-action")
                cityListEl.append(newCityButton);
            }

            var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
                
            fetch (oneCallUrl)
                .then(function(response) {
                    return response.json();
                })
                .then (function (data) {
                    console.log(data);
                function displayData() {
                    cityNameEl.text(cityName);
                    currentTemperature.text(data.current.temp + "°F");
                    currentHumidity.text(data.current.humidity + "%");
                    currentWind.text(data.current.wind_speed + " mph");
                    currentUvIndex.text(data.current.uvi);

                    if (currentUvIndex.text() < 3){
                        currentUvIndex.addClass('bg-success');
                    } else if ( currentUvIndex.text() > 3 && currentUvIndex.text() < 7){
                        currentUvIndex.addClass('bg-warning');
                    } else currentUvIndex.addClass('bg-danger');
                }
                displayData()

                    console.log(data.daily[0].temp.day)

                    for (var i = 0; i < dateElArray.length; i++){
                        dateElArray.eq(i).text(moment(data.daily[i].dt, "X").format('L'));
                        var weatherIconUrl = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                        icon.eq(i).attr('src', weatherIconUrl)
                    }

                        
                    for (var i = 0; i < forecastTempArray.length; i ++) {
                        forecastTempArray.eq(i).text(data.daily[i+1].temp.day + "°F");
                        forecastHumidityArray.eq(i).text(data.daily[i+1].humidity + "%");
                        forecastWindArray.eq(i).text(data.daily[i+1].wind_speed + " mph");

                        
                    }

                })
        })
        
}

function Init() {
    var storedCityArray = JSON.parse(localStorage.getItem('city names'));
    if (storedCityArray === null) {
        cityArray.push("Atlanta");
        localStorage.setItem('city names', JSON.stringify(cityArray));
    }; 
    getApi("Atlanta")
    var storedCityArray = JSON.parse(localStorage.getItem('city names'));
    for (var i = 0 ; i < storedCityArray.length; i++) {
            var existingCityButton =  $("<button></button>").text(storedCityArray[i])
            existingCityButton.addClass("list-group-item list-group-item-action")
            cityListEl.append(existingCityButton);
    }
}



Init ();
searchButton.click( function() {
    var searchResult = searchInputField.val();
    getApi(searchResult);

})

cityListEl.on( 'click', function(event){
    event.preventDefault();
    var existingCityName = ($(event.target).text());
    getApi(existingCityName);
})