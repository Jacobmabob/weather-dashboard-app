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


var cityArray = []
var storedCityArray = JSON.parse(localStorage.getItem('city names'));



function Init() {
    for (var i = 0 ; i < storedCityArray.length; i++) {
        var existingCityButton =  $("<button></button>").text(storedCityArray[i])
        existingCityButton.addClass("list-group-item list-group-item-action")
        cityListEl.append(existingCityButton);
        


 }
}


function getApi() {

    var searchResult = searchInputField.val();
    var apiKey = "4c0ee78030e85f87dd27ff63df4ab854"
    var apiCityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchResult + "&appid=" + apiKey
    console.log(apiCityUrl);

    return fetch (apiCityUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data){
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                var cityName = data.name 
                storedCityArray.push(cityName);
                // if (storedCityArray.length > 9){
                //     storedCityArray.pop();
                // }
                localStorage.setItem('city names', JSON.stringify(storedCityArray));
                console.log(storedCityArray)


            
                var newCityButton = $("<button></button>").text(cityName)
                newCityButton.addClass("list-group-item list-group-item-action")
                cityListEl.append(newCityButton);
                

                

                var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
                
                fetch (oneCallUrl)
                    .then(function(response) {
                        return response.json();
                    })
                    .then (function (data) {
                        console.log(data);
                        cityNameEl.text(cityName);
                        currentTemperature.text(data.current.temp + "°F");
                        currentHumidity.text(data.current.humidity + "%");
                        currentWind.text(data.current.wind_speed + " mph");
                        currentUvIndex.text(data.current.uvi);

                        console.log(data.daily[0].temp.day)

                        for (var i = 0; i < dateElArray.length; i++){
                            dateElArray.eq(i).text(moment(data.daily[i].dt, "X").format('L'));

                            var weatherIconUrl = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                            console.log(data.daily[i].weather[0].icon)
                            var icon = $('<img class="icon">')
                            icon.attr('src', weatherIconUrl)
                            weatherDisplayCards.eq(i).prepend(icon)

                        }

                        
                        for (var i = 0; i < forecastTempArray.length; i ++) {
                        forecastTempArray.eq(i).text(data.daily[i].temp.day);
                        forecastHumidityArray.eq(i).text(data.daily[i].humidity);
                        forecastWindArray.eq(i).text(data.daily[i].wind_speed);

                    }

                    })
        })
        
}



Init ();
searchButton.on('click', getApi)