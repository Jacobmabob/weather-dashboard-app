var searchInputField = $("#city-search-input");
var searchButton = $("#search-bttn");
var currentDayCard = $("#current-day-card")
var cityListEl = $("#city-list");

var currentTemperature = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWind = $("#current-wind");
var currentUvIndex = $("#current-uv")

var cityArray = []

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
                cityArray.push(cityButton)

                
                var cityButton = $("<button></button>").text(cityName)
                cityButton.addClass("list-group-item list-group-item-action")
                cityListEl.append(cityButton)
                

                

                var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
                
                fetch (oneCallUrl)
                    .then(function(response) {
                        return response.json();
                    })
                    .then (function (data) {
                        console.log(data);
                        currentTemperature.text(data.current.temp + "°F");
                        currentHumidity.text(data.current.humidity + "%");
                        currentWind.text(data.current.wind_speed + " mph");
                        currentUvIndex.text(data.current.uvi);
                    

                    })
        })
        
}




searchButton.on('click', getApi)