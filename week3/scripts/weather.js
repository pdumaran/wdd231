// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Dumaguete, Philippines Coordinates
const myLat = "9.31";
const myLon = "123.31";
const myApiKey = "120143d6febd8135fa54f129b728331e";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=metric&appid=${myApiKey}`;

// Asynchronous function to fetch API data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // Testing in console
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display results in HTML
function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;

    const iconCode = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

apiFetch();