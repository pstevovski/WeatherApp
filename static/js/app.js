//api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111
const weather = new Weather();
const ui = new UI();

const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const currentBtn = document.querySelector("#current");
const forecastBtn = document.querySelector("#forecast");
const buttons = document.querySelector(".buttons");

form.addEventListener("submit", e => {
    const city = inputField.value;

    // Check if theres a value in the input field, if there is display data
    if(!city) {
        alert("Enter city name")
    } else {
        // Get the current weather for the city
        current(city);
    }
    e.preventDefault();
})

// Get current weather
function current(city) {
    weather.getCurrent(city).then(data => {
        ui.displayData(data);

        // Get custom weather icon
        ui.weatherIcon(data);

        // Display buttons
        buttons.style.display = "flex";
    })
}

// Get the forecast
forecastBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    if(!city) {
        alert("Enter city name");
    } else {
        weather.getForecast(city).then(forecast => {
            ui.displayForecast(forecast);
            // console.log(forecast);
        })
    }
})

// Get the current weather again (after clicking forecast)
currentBtn.addEventListener("click", ()=>{
    const city = inputField.value;
    if(!city) {
        alert("Enter city name");
    } else {
        current(city);
    }
})

/* 
Add: 
-Celsius / Fahrenheit - option to choose between the two for the user;
-Language MK / EN (?);
*/