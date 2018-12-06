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
        // Display current weather data
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
            // Display forecast data for the next 5 days
            ui.displayForecast(forecast);
        })

        // Mark the active button
        forecastBtn.classList.add("activeButton");
        currentBtn.classList.remove("activeButton");
    }

})

// Get the current weather again (after clicking forecast)
currentBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    if(!city) {
        alert("Enter city name");
    } else {
        current(city);

        // Mark the active button
        currentBtn.classList.add("activeButton");
        forecastBtn.classList.remove("activeButton");
    }
})

// Metric units
document.querySelector("#celsius").addEventListener("click", ()=>{
    const city = inputField.value;
    const celsius = "°C";

    if(!city) {
        alert("Enter city name");
    } else {
        weather.units = "metric";

        ui.changeSign(celsius);
    
        // Call current weather data
        current(city);
    }
})

// Imperial units
document.querySelector("#fahrenheit").addEventListener("click", ()=>{
    const city = inputField.value;
    const fahrenheit = "°F";

    if(!city) {
        alert("Enter city name");
    } else {
        weather.units = "imperial"

        ui.changeSign(fahrenheit);

        // Call current weather data
        current(city);
    }
})

/* 
Add: 
- Add an error notification if user hasn't entered a city name
- Translate the forecast date into a week's day
- Add an icon in the title
*/