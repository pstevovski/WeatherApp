import {weather} from "./weather.js";
import {ui} from "./ui.js";

const form = document.querySelector("#form");
const inputField = document.querySelector("#inputField");
const currentBtn = document.querySelector("#current");
const forecastBtn = document.querySelector("#forecast");
const buttons = document.querySelector(".buttons");
const imperialBtn = document.querySelector("#fahrenheit");
const metricBtn = document.querySelector("#celsius");
const loader = document.querySelector(".loader");

// Initialize coordinates variable
let coords;

// When page is loaded, check if there are coordinates in LS, if not then prompt the user
document.addEventListener("DOMContentLoaded", ()=>{
    coords = JSON.parse(localStorage.getItem("coords"));
    // If there is coords in local storage, display data
    if(coords) {
        // Get current data by coordinates
        coordinatesData(coords);
    } else {
        // Prompt the user to get his coordinates
        navigator.geolocation.getCurrentPosition(getCoordinates);
    }
})

// Gets the coordinates for the user if the user allows Locations
function getCoordinates(data) {
    const coordinates = {
        latitude: Math.floor(data.coords.latitude),
        longitude: Math.floor(data.coords.longitude)
    }
    // Save to local storage
    localStorage.setItem("coords", JSON.stringify(coordinates));
    coordinatesData(coordinates);
}

// Displays current weather data based on the coords (saved or first-time allowed)
function coordinatesData(coords) {
    // Get the saved coordinates
    coords = JSON.parse(localStorage.getItem("coords"));

    // Display loader and hide buttons (if they were displayed)
    loader.style.display = "block";
    buttons.style.display = "none";

    weather.getCurrentByCoords(coords).then(data => {
        // Display current weather data
        ui.displayData(data);

        // Get custom weather icon
        ui.weatherIcon(data);

        // Display buttons
        buttons.style.display = "flex";

        // Hide loader
        loader.style.display = "none";
    });

    // Mark the active button
    currentBtn.classList.add("activeButton");
    forecastBtn.classList.remove("activeButton");

    // Clear previous data
    ui.clearPreviousData();
}

// Search for a city
form.addEventListener("submit", e => {
    const city = inputField.value;

    // Check if theres a value in the input field, if there is display data
    if(!city) {
        // Display error notification
        ui.error();
    } else {
        // Get a random loader icon
        ui.randomLoaderIcon();

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
    }).catch(() => {
        // If city hasn't been found.
        const notFound = "City not found. Please enter another one or check for typing errors.";
        ui.error(notFound);
    });

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
    ui.randomLoaderIcon();

    if(coords && !city) {
        // Show loader
        loader.style.display = "block";

        // Hide the buttons
        buttons.style.display = "none";

        // Fetch data by using the saved coordinates
        weather.getForecastByCoords(coords).then(forecast => {
            // Display forecast data for the next 5 days
            ui.displayForecast(forecast);

            // Hide loader after data is loaded
            loader.style.display = "none";

            // Display the buttons again
            buttons.style.display = "flex";
        })
    } else if(!city) {
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
    if(coords && !city) {
        // Get the current weather based on the saved coordinates 
        coordinatesData(coords);
    } else if(!city) {
        ui.error();
    } else {
        // Get random loader icon
        ui.randomLoaderIcon();

        // Get current city's weather data
        current(city);

        // Mark the active button
        currentBtn.classList.add("activeButton");
        forecastBtn.classList.remove("activeButton");
    }

    // Clear previous data
    ui.clearPreviousData();
})

// Get metric units
function metricUnits(celsius) {
    // Get random loader icon
    ui.randomLoaderIcon();

    // Set the units and locale to use european values
    weather.units = "metric";
    ui.locale = "en-GB";

    // Change the temperature degrees sign
    ui.changeSign(celsius);
}

// Metric units
metricBtn.addEventListener("click", () => {
    const city = inputField.value;
    const celsius = "°C";

    // Add / remove appropriate classes
    metricBtn.classList.add("activeUnit");
    imperialBtn.classList.remove("activeUnit");

    // Display error notification if there's no value in the input field
    if(coords) {
        // Change to metric units
        metricUnits(celsius);

        // Get the current weather based on the saved coordinates 
        coordinatesData(coords);
    } else if(!city) {
        ui.error();
    } else {
        // Change to metric units
        metricUnits(celsius);

        // Call current weather data
        current(city);
    }
})

function imperialUnits(fahrenheit) {
    // Get random loader icon
    ui.randomLoaderIcon();

    // Set the units and the locale to imperial
    weather.units = "imperial"
    ui.locale = "en-US";

    // Change the temperature degrees sign
    ui.changeSign(fahrenheit);
}

// Imperial units
imperialBtn.addEventListener("click", () => {
    const city = inputField.value;
    const fahrenheit = "°F";

    // Add / remove appropriate classes
    imperialBtn.classList.add("activeUnit");
    metricBtn.classList.remove("activeUnit");

    // Display error notification if theres no value in the input field
    if(coords) {
        // Change to imperial units
        imperialUnits(fahrenheit);

        // Get the current weather based on the saved coordinates 
        coordinatesData(coords);
    } else if(!city) {
        ui.error();
    } else {
        // Change to imperial units
        imperialUnits(fahrenheit);

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

// Open and close About modal
const about = document.querySelector(".about-container");
document.querySelector("#about").addEventListener("click", () => {
    about.style.display = "block";
})

document.querySelector("#closeAbout").addEventListener("click", () => {
    about.style.display = "none";
})
