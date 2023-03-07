const weatherApiKey = "b775bf972e579a94a3d7a57a95393b4b";
const cities = ["Helsinki", "Vantaa", "Espoo"];
const weatherReport = document.getElementById("weather-report");

cities.forEach(city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp.toFixed(0);
            weatherReport.innerHTML += `<p>${city}: ${temperature}°C</p>`;
        })
        .catch(error => console.log(error));
});