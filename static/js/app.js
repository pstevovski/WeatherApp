const weather = new Weather();
const ui = new UI();

const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const currentBtn = document.querySelector("#current");
const forecastBtn = document.querySelector("#forecast");
const buttons = document.querySelector(".buttons");
const imperialBtn = document.querySelector("#fahrenheit");
const metricBtn = document.querySelector("#celsius");
const loader = document.querySelector(".loader");

// Random loader icon
const iconsArray = ["cloudy", "day", "night", "rainy-6", "snowy-6", "thunder"];
function randomLoaderIcon() {
    let min = 0;
    let max = iconsArray.length;
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    const loaderIcon = document.querySelector(".loader img");
    loaderIcon.setAttribute("src", `static/images/${iconsArray[randomNum]}.svg`);
};

form.addEventListener("submit", e => {
    const city = inputField.value;

    // Check if theres a value in the input field, if there is display data
    if(!city) {
        // Display error notification
        ui.error();
    } else {
        // Get a random loader icon
        randomLoaderIcon();

        // Get the current weather for the city
        current(city);
    }

    // Clear previous data
    ui.clearPreviousData();

    // Prevent the form submiting data
    e.preventDefault();
})

// Get current weather
function current(city) {
    // Display loader and hide buttons (if they were displayed)
    loader.style.display = "block";
    buttons.style.display = "none";

    weather.getCurrent(city).then(data => {
        // Display current weather data
        ui.displayData(data);

        // Get custom weather icon
        ui.weatherIcon(data);

        // Display buttons
        buttons.style.display = "flex";

        // Hide loader
        loader.style.display = "none";
    })

    // Mark the active button
    forecastBtn.classList.remove("activeButton");
    currentBtn.classList.add("activeButton");

    // Clear previous data
    ui.clearPreviousData();
}

// Get the forecast
forecastBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    // Get a random loader icon
    randomLoaderIcon();

    if(!city) {
        // Display error notification
        ui.error();
    } else {
        // Show loader
        loader.style.display = "block";

        // Hide the buttons
        buttons.style.display = "none";

        // Fetch data and then send the data to the appropriate method
        weather.getForecast(city).then(forecast => {
            // Display forecast data for the next 5 days
            ui.displayForecast(forecast);

            // Hide loader after data is loaded
            loader.style.display = "none";

            // Display the buttons again
            buttons.style.display = "flex";
        })

        // Mark the active button
        forecastBtn.classList.add("activeButton");
        currentBtn.classList.remove("activeButton");
    }

    // Clear previous data
    ui.clearPreviousData();
})

// Get the current weather
currentBtn.addEventListener("click", ()=>{
    const city = inputField.value;

    // Display error notification if there's no value in the input field
    if(!city) {
        ui.error();
    } else {
        // Get random loader icon
        randomLoaderIcon();

        // Get current city's weather data
        current(city);

        // Mark the active button
        currentBtn.classList.add("activeButton");
        forecastBtn.classList.remove("activeButton");
    }

    // Clear previous data
    ui.clearPreviousData();
})

// Metric units
metricBtn.addEventListener("click", function(){
    const city = inputField.value;
    const celsius = "°C";

    // Add / remove appropriate classes
    this.classList.add("activeUnit");
    imperialBtn.classList.remove("activeUnit");

    // Display error notification if there's no value in the input field
    if(!city) {
        ui.error();
    } else {
        // Get random loader icon
        randomLoaderIcon();

        // Set the units and locale to use european values
        weather.units = "metric";
        ui.locale = "en-GB";

        // Change the temperature degrees sign
        ui.changeSign(celsius);
    
        // Call current weather data
        current(city);
    }
})

// Imperial units
document.querySelector("#fahrenheit").addEventListener("click", function(){
    const city = inputField.value;
    const fahrenheit = "°F";

    // Add / remove appropriate classes
    this.classList.add("activeUnit");
    metricBtn.classList.remove("activeUnit");

    // Display error notification if theres no value in the input field
    if(!city) {
        ui.error();
    } else {
        // Get random loader icon
        randomLoaderIcon();

        // Set the units and the locale to imperial
        weather.units = "imperial"
        ui.locale = "en-US";

        // Change the temperature degrees sign
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

        // Hide the buttons
        buttons.style.display = "none";
    }
})

/* 
Add: 
- Add an error notification if user hasn't entered a city name - done
- Translate the forecast date into a week's day - done
- Add an icon in the title
- Add about modal
- Add loader when loading weather data - done
*/