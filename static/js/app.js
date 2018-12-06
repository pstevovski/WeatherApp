//api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111
const weather = new Weather();
const ui = new UI();

const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const currentBtn = document.querySelector("#current");
const forecastBtn = document.querySelector("#forecast");
const buttons = document.querySelector(".buttons");
const imperialBtn = document.querySelector("#fahrenheit");
const metricBtn = document.querySelector("#celsius");
const spinner = document.querySelector(".spinner");


// RANDOM SPINNER ICON ? OR DEFAULT - CSS - SPINNER ?
// (function(){
//     let min = 0;
//     let max = iconsArray.length;
//     const randomNum = 
// })();

form.addEventListener("submit", e => {
    const city = inputField.value;

    // Check if theres a value in the input field, if there is display data
    if(!city) {
        // Display error notification
        ui.error();
    } else {
        // Get the current weather for the city
        current(city);
    }

    // Clear previous data
    ui.clearPreviousData();

    e.preventDefault();
})

// Get current weather
function current(city) {
    spinner.style.display = "block";
    weather.getCurrent(city).then(data => {
        // Display current weather data
        ui.displayData(data);

        // Get custom weather icon
        ui.weatherIcon(data);

        // Display buttons
        buttons.style.display = "flex";

        // Hide spinner
        spinner.style.display = "none";
    })

    // Mark the active button
    forecastBtn.classList.remove("activeButton");
    currentBtn.classList.add("activeButton");
}

// Get the forecast
forecastBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    if(!city) {
        // Display error notification
        ui.error();
    } else {
        // Show spinner
        spinner.style.display = "block";
        weather.getForecast(city).then(forecast => {
            // Display forecast data for the next 5 days
            ui.displayForecast(forecast);

            // Hide spinner after data is loaded
            spinner.style.display = "none";
        })

        // Mark the active button
        forecastBtn.classList.add("activeButton");
        currentBtn.classList.remove("activeButton");
    }

    // Clear previous data
    ui.clearPreviousData();

})

// Get the current weather again (after clicking forecast)
currentBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    if(!city) {
        // Display error notification
        ui.error();
    } else {
        current(city);

        // Mark the active button
        currentBtn.classList.add("activeButton");
        forecastBtn.classList.remove("activeButton");
    }

    // Clear previous data
    ui.clearPreviousData();
})

// Metric units
metricBtn.addEventListener("click", ()=>{
    const city = inputField.value;
    const celsius = "°C";

    this.classList.add("activeUnit");
    imperialBtn.classList.remove("activeUnit");

    if(!city) {
        // Display error notification
        ui.error();
    } else {
        weather.units = "metric";
        ui.locale = "en-GB";
        ui.changeSign(celsius);
    
        // Call current weather data
        current(city);
    }
})

// Imperial units
document.querySelector("#fahrenheit").addEventListener("click", function(){
    const city = inputField.value;
    const fahrenheit = "°F";

    this.classList.add("activeUnit");
    metricBtn.classList.remove("activeUnit");

    if(!city) {
        // Display error notification
        ui.error();
    } else {
        weather.units = "imperial"
        ui.locale = "en-US";

        ui.changeSign(fahrenheit);

        // Call current weather data
        current(city);
    }
})

// Check if input field is empty - if so, clear the data displayed
inputField.addEventListener("keyup", function() {
    if(this.value === "") {
        // Clear the UI
        ui.clearUI();

        buttons.style.display = "none";
    }
})

/* 
Add: 
- Add an error notification if user hasn't entered a city name - done
- Translate the forecast date into a week's day - done
- Add an icon in the title
- Add about modal
- Add spinner when loading weather data
*/