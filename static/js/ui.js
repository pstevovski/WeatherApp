class UI {
    constructor() {
        this.weather = document.querySelector("#weather-data");
        this.forecastContainer = document.querySelector("#forecast-container");
        this.name = document.querySelector("#name");
        this.weather_icon = document.querySelector("#weather_icon");
        this.weather_desc = document.querySelector("#weather_desc");
        this.notification = document.querySelector(".error");
        this.units = document.querySelector(".units");
        this.sign = "°C";
        this.locale = "en-GB";
        this.iconsArray = ["cloudy", "day", "night", "rainy-6", "snowy-6", "thunder"];
        this.direction;
    }

    // Get a random loader weather icon
    randomLoaderIcon() {
        let min = 0;
        let max = this.iconsArray.length;
        min = Math.ceil(min);
        max = Math.floor(max);
        const randomNum = Math.floor(Math.random() * (max - min)) + min;
    
        const loaderIcon = document.querySelector(".loader img");
        loaderIcon.setAttribute("src", `static/images/${this.iconsArray[randomNum]}.svg`);
    };
    
    // Change sign - celsius or fahrenheit
    changeSign(sign) {
        this.sign = sign;
    }

    // Clear previous data when toggling between current and forecast
    clearPreviousData() {
        this.weather.innerHTML = "";
        this.weather_desc.textContent = "";
        this.weather_icon.setAttribute("src", "");
        this.weather_icon.setAttribute("width", "");
        this.weather_icon.setAttribute("height", "");
        this.weather_icon.setAttribute("alt", "");
    }

    // Display city's current weather data
    displayData(data){
        // Display the units
        this.units.style.display = "block";

        // Display city and state name
        this.name.textContent = `${data.name}, ${data.sys.country}`;

        // Weather description
        this.weather_desc.textContent = `${data.weather[0].main}`;

        // Floor temeperature data to a whole number
        const temp = Math.floor(data.main.temp);
        const temp_min = Math.floor(data.main.temp_min);
        const temp_max = Math.floor(data.main.temp_max);
        const windSpeed = Math.floor(data.wind.speed);

        // Get wind's direction
        const windDegrees = Math.floor(data.wind.deg);

        // Compare the wind degrees with a pre-set value to determine wind direction
        switch(true) {
            case windDegrees <= 45:
                this.direction = "N";
                break;
            case windDegrees <= 90:
                this.direction = "NE";
                break;
            case windDegrees <= 135:
                this.direction = "E";
                break;
            case windDegrees <= 180:
                this.direction = "SE";
                break;
            case windDegrees <= 225:
                this.direction = "S";
                break;
            case windDegrees <= 270:
                this.direction = "SW";
                break;
            case windDegrees <= 315:
                this.direction = "W";
                break;
            case windDegrees <= 360:
                this.direction = "NW";
                break;
        }

        // Display the data
        this.weather.innerHTML = `
        <div class="weather-data_current">
            <p>Current temperature: <span class="numerals">${temp} ${this.sign}</span></p>
            <p>Min. temperature: <span class="numerals">${temp_min} ${this.sign}</span></p>
            <p>Max. temperature: <span class="numerals">${temp_max} ${this.sign}</span></p>
            <p>Atmospheric preassure: <span class="numerals">${data.main.pressure} hPa </span></p>
            <p>Humidity: <span class="numerals">${data.main.humidity} %</span></p>
            <p>Wind: <span class="numerals">${windSpeed} km/h, ${this.direction}</span></p>

        </div>
        `;

        setTimeout(() => {
            document.querySelector(".weather-data_current").classList.add("activeCurrent");
        }, 50);
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
                this.weather_icon.setAttribute("alt", "Thunder");
                break;
            // Drizzle (light rain) icon
            case 3:
                this.weather_icon.setAttribute("src", "static/images/rainy-4.svg");
                this.weather_icon.setAttribute("alt", "Drizzle");
                break;
            // Rain icon
            case 5:
                this.weather_icon.setAttribute("src", "static/images/rainy-6.svg");
                this.weather_icon.setAttribute("alt", "Rainy");
                break;
            // Snow icon
            case 6:
                this.weather_icon.setAttribute("src", "static/images/snowy-6.svg");
                this.weather_icon.setAttribute("alt", "Snow");
                break;
            // Atmoshpere icon
            case 7:
                this.weather_icon.setAttribute("src", "static/images/mist.svg");
                this.weather_icon.setAttribute("alt", "Atmosphere icon");
                break;
        }

        // If its clear skies
        if(iconId === 800) {
            if(icon === "day") {
                this.weather_icon.setAttribute("src", "static/images/day.svg");
                this.weather_icon.setAttribute("alt", "Clear Day");
            } else if(icon === "night") {
                this.weather_icon.setAttribute("src", "static/images/night.svg")
                this.weather_icon.setAttribute("alt", "Clear Night");
            };
        }

        // If there are "few clouds"
        if(iconId === 801) {
            if(icon === "day") {
                this.weather_icon.setAttribute("src", "static/images/cloudy-day-3.svg");
                this.weather_icon.setAttribute("alt", "Cloudy Day");
            } else if(icon === "night") {
                this.weather_icon.setAttribute("src", "static/images/cloudy-night-3.svg")
                this.weather_icon.setAttribute("alt", "Cloudy Night");
            };
        } else if(iconId === 802 || iconId === 803 || iconId === 804) {
            // If its overcast or cloudy
            this.weather_icon.setAttribute("src", "static/images/cloudy.svg");
            this.weather_icon.setAttribute("alt", "Overcast");
        }

        // Set the width and height of the weather icon
        this.weather_icon.setAttribute("width", "120px");
        this.weather_icon.setAttribute("height", "120px");
    }

    // Display forecast
    displayForecast(forecast) {
        // Display the units
        this.units.style.display = "block";

        // Clear current weather description
        this.weather_desc.textContent = "";

        // Clear current weather icon
        this.weather_icon.setAttribute("src", "");
        this.weather_icon.setAttribute("width", "");
        this.weather_icon.setAttribute("height", "");

        // Generate output
        let output = `
            <div class="forecast-container">
        `;

        setTimeout(() => {
            document.querySelector(".forecast-container").classList.add("activeForecast");            
        }, 50);

        // Init iconSource
        let iconSource;
        
        for(let i = 7; i < forecast.list.length; i += 7) {

            // Floor the temperature to a whole number
            const temp = Math.floor(forecast.list[i].main.temp);
            const windSpeed = Math.floor(forecast.list[i].wind.speed);

            // Convert the date from the API to a weekday
            let theDate = forecast.list[i].dt_txt;
            let weekday = new Date(theDate).toLocaleDateString(this.locale, {weekday: "long"});
            let dayDate = new Date(theDate).toLocaleDateString(this.locale);

            // Display forecast weather icon
            const iconId = forecast.list[i].weather[0].id;

            // Check if the icon name ends with d => day or n => night
            const icon = forecast.list[i].weather[0].icon.endsWith("n") ? "night" : "day";

            // Get the icon's id first number
            const fNum = parseInt(iconId.toString()[0]);

            switch(fNum) {
                // Thunderstorm icon
                case 2:
                    iconSource = "static/images/thunder.svg";
                    break;
                // Drizzle (light rain) icon
                case 3:
                    iconSource ="static/images/rainy-4.svg";
                    break;
                // Rain icon
                case 5:
                    iconSource ="static/images/rainy-6.svg";
                    break;
                // Snow icon
                case 6:
                    iconSource ="static/images/snowy-6.svg";
                    break;
                // Atmoshpere icon
                case 7:
                    iconSource ="static/images/mist.svg";
                    break;
            }

            // If its clear skies
            if(iconId === 800) {
                if(icon === "day") {
                    iconSource ="static/images/day.svg";
                } else if(icon === "night") {
                    iconSource ="static/images/night.svg";
                };
            }

            // If there are "few clouds"
            if(iconId === 801) {
                if(icon === "day") {
                    iconSource ="static/images/cloudy-day-3.svg"
                } else if(icon === "night") {
                    iconSource ="static/images/cloudy-night-3.svg";
                };
            } else if(iconId === 802 || iconId === 803 || iconId === 804) {
                // If its overcast or cloudy
                iconSource ="static/images/cloudy.svg";
            }

            output += `
            <div class="forecast-box">
            <img src=${iconSource} width="100px" height="100px">
            <div class="forecast-data">
                <p>Temperature: ${temp} ${this.sign}</p>
                <p>Humidity: ${forecast.list[i].main.humidity} %</p>
                <p>Wind speed: ${windSpeed} km/h</p>
                <p id="day">${weekday}</p>
                <p id="day-date">( ${dayDate} )</p>
            </div>
            </div>`;
        }`
        </div>`;

        // Append the generated output to the weather container
        this.weather.innerHTML = output;
    }

    // Display error notification
    error(notFound) {
        this.notification.style.display = "flex";

        if(notFound) {
            document.querySelector(".error p").textContent = notFound;
        }

        setTimeout(() => {
            this.notification.style.display = "none";
        }, 3000);
    }

    // Clear the UI
    clearUI() {
        this.weather.innerHTML = "";
        this.units.style.display = "none";
        this.weather_desc.textContent = "";
        this.weather_icon.setAttribute("src", "");
        this.weather_icon.setAttribute("width", "");
        this.weather_icon.setAttribute("height", "");
        this.weather_icon.setAttribute("alt", "");
        this.name.textContent = "";
    }
}

export const ui = new UI();