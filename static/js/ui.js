class UI {
    constructor() {
        this.weather = document.querySelector("#weather-data");
        this.forecastContainer = document.querySelector("#forecast-container");
        this.name = document.querySelector("#name");
        this.weather_icon = document.querySelector("#weather_icon");
        this.weather_desc = document.querySelector("#weather_desc");
    }
    // Display city's current weather data
    displayData(data){
        // Display city and state name
        this.name.textContent = `${data.name}, ${data.sys.country}`;

        // Weather description
        this.weather_desc.textContent = `${data.weather[0].main}`;

        // Floor temeperature data
        const temp = Math.floor(data.main.temp);
        const temp_min = Math.floor(data.main.temp_min);
        const temp_max = Math.floor(data.main.temp_max);

        this.weather.innerHTML = `
        <div class="weather-data_current">
            <p>Current temperature: <span class="numerals">${temp} °C</span></p>
            <p>Min. temperature: <span class="numerals">${temp_min} °C</span></p>
            <p>Max. temperature: <span class="numerals">${temp_max} °C</span></p>
            <p>Atmospheric preassure: <span class="numerals">${data.main.pressure} mbar </span></p>
            <p>Humidity: <span class="numerals">${data.main.humidity} %</span></p>
            <p>Wind speed: <span class="numerals">${data.wind.speed} km/h</span></p>
            <p>Visibility: <span class="numerals">${data.visibility} m</span></p>
        </div>
        `;
    }

    // Weather icon
    weatherIcon(data) {
        // Get the Icon's id
        const iconId = data.weather[0].id;

        // Check if the icon name ends with d => day or n => night
        const icon = data.weather[0].icon.endsWith("n") ? "night" : "day";

        // Get the icon's id first number
        const fNum = parseInt(iconId.toString()[0]);

        switch(fNum) {
            // Thunderstorm icon
            case 2:
                this.weather_icon.setAttribute("src", "static/images/thunder.svg");
                break;
            // Drizzle (light rain) icon
            case 3:
                this.weather_icon.setAttribute("src", "static/images/rainy-4.svg");
                break;
            // Rain icon
            case 5:
                this.weather_icon.setAttribute("src", "static/images/rainy-6.svg");
                break;
            // Snow icon
            case 6:
                this.weather_icon.setAttribute("src", "static/images/snowy-6.svg");
                break;
            // Atmoshpere icon
            case 7:
                this.weather_icon.setAttribute("src", "static/images/mist.svg");
                break;
        }

        // If its clear skies
        if(iconId === 800) {
            if(icon === "day") {
                this.weather_icon.setAttribute("src", "static/images/day.svg");
            } else if(icon === "night") {
                this.weather_icon.setAttribute("src", "static/images/night.svg")
            };
        }

        // If there are "few clouds"
        if(iconId === 801) {
            if(icon === "day") {
                this.weather_icon.setAttribute("src", "static/images/cloudy-day-3.svg");
            } else if(icon === "night") {
                this.weather_icon.setAttribute("src", "static/images/cloudy-night-3.svg")
            };
        } else if(iconId === 802 || iconId === 803 || iconId === 804) {
            // If its overcast or cloudy
            this.weather_icon.setAttribute("src", "static/images/cloudy.svg");
        }

        // Set the width and height of the weather icon
        this.weather_icon.setAttribute("width", "120px");
        this.weather_icon.setAttribute("height", "120px");
    }

    // Display forecast
    displayForecast(forecast) {
        let output = `
            <div class="forecast-container">
        `;
        for(let i = 7; i < forecast.list.length; i += 7) {
            output += `
            <div class="forecast-box">
                <p>SUN</p>
                <div class="forecast-data">
                    <p>Temperature: ${forecast.list[i].main.temp} C</p>
                    <p>Humidity: ${forecast.list[i].main.humidity} %</p>
                    <p>Wind speed: ${forecast.list[i].wind.speed} km/h</p>
                    <p>Monday</p>
                </div>
            </div>`;
        }`</div>`;
        this.weather.innerHTML = output;
    }
}