const cities = [
    { name: "London", lon: "-0.1276", lat: "51.5074" },
    { name: "Paris", lon: "2.3522", lat: "48.8566" },
    { name: "Berlin", lon: "13.4050", lat: "52.5200" },
    { name: "Rome", lon: "12.4964", lat: "41.9028" },
    { name: "Madrid", lon: "-3.7038", lat: "40.4168" },
    { name: "Athens", lon: "23.7275", lat: "37.9838" },
    { name: "Vienna", lon: "16.3738", lat: "48.2082" },
    { name: "Amsterdam", lon: "4.8970", lat: "52.3779" },
    { name: "Dublin", lon: "-6.2603", lat: "53.3498" },
    { name: "Stockholm", lon: "18.0686", lat: "59.3293" }
  ];

  const locationSelect = document.getElementById("locationSelect");

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = `${city.lon},${city.lat}`;
    option.textContent = city.name;
    locationSelect.appendChild(option);
  });

  function getWeather() {
    const selectedLocation = locationSelect.value;
    const [lat, lon] = selectedLocation.split(',');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`, requestOptions)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById("weatherInfo");
        const currentDate = new Date().toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });

        const dayWeather = data.dataseries[0];
        const nightWeather = data.dataseries[1];

        const dayTemperature = dayWeather.temp2m;
        const nightTemperature = nightWeather.temp2m;

        const dayConditions = dayWeather.weather;
        const nightConditions = nightWeather.weather;

        const weatherImageSrc = `images/${dayConditions}.png`;

        const weatherHTML = `
          <h2>${currentDate}</h2>
          <p>Day Temperature: ${dayTemperature}°C</p>
          <p>Night Temperature: ${nightTemperature}°C</p>
          <p>Day Conditions: ${dayConditions}</p>
          <p>Night Conditions: ${nightConditions}</p>
          <img src="${weatherImageSrc}" alt="Weather Image">
        `;

        weatherInfo.innerHTML = weatherHTML;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }