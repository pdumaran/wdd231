const currentWeatherEl = document.querySelector("#weather-current");
const forecastEl = document.querySelector("#weather-forecast");

// Coordinates for Dumaguete City
const lat = "9.31";
const lon = "123.31";
const apiKey = "120143d6febd8135fa54f129b728331e";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (currentRes.ok) {
            const currentData = await currentRes.json();
            displayCurrentWeather(currentData);
        }

        if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (currentWeatherEl) currentWeatherEl.innerHTML = "<p>Weather data unavailable.</p>";
    }
}

function displayCurrentWeather(data) {
    if (!currentWeatherEl) return;

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    currentWeatherEl.innerHTML = `
        <div class="weather-info-group">
            <img src="${iconSrc}" alt="${desc}">
            <div>
                <p style="font-size: 1.4rem; font-weight: bold;">${temp}&deg;C</p>
                <p style="text-transform: capitalize;">${desc}</p>
                <p style="font-size: 0.85rem; color: #555;">Humidity: ${data.main.humidity}%</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    if (!forecastEl) return;
    forecastEl.innerHTML = "";

    // OpenWeather 5-day forecast returns 3-hour intervals. Pick noon entries.
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);

        const dayCard = document.createElement("div");
        dayCard.className = "forecast-day";
        dayCard.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temp}&deg;C</p>
        `;
        forecastEl.appendChild(dayCard);
    });
}

if (currentWeatherEl && forecastEl) {
    fetchWeatherData();
}