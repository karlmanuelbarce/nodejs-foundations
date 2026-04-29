const fetchpromise = fetch('https://api.open-meteo.com/v1/forecast?latitude=14.6&longitude=121.0&current_weather=true');

async function getWeather() {
    try {
        const response = await fetchpromise;
        const data = await response.json();
        console.log('Current weather:', data.current_weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather();