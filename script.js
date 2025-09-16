const apiKey = '5e532822b56440e4a63113949251209'; 
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

document.getElementById('get-weather').addEventListener('click', () => {
    let city = document.getElementById('city-input').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function fetchWeather(city) {
    try {
        const encodedCity = encodeURIComponent(city);
        const url = `${apiUrl}?key=${apiKey}&q=${encodedCity}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-display').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const name = location.name;
    const temp = current.temp_c;
    const description = current.condition.text;
    const icon = current.condition.icon;
    document.getElementById('weather-display').innerHTML = `
        <h2>${name}</h2>
        <img src="https:${icon}" alt="${description}">
        <p>Temperature: ${temp}°C</p>
        <p>Description: ${description}</p>
    `;
}

