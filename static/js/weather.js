class Weather {
    constructor() {
        this.key = "2b7f38cb0eab8c48a73a424e059a3036";
    }

    // Get current weather
    async getCurrent(city) {
        console.log(city);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.key}`);

        const data = await response.json();

        return data;
    }
    // Get weather forecast for a city
    async getForecast(city) {
        // Forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.key}`);

        const forecastData = await forecastResponse.json();

        return forecastData;
    }
}