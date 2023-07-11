const cities = [
  { name: "London", lon: "-0.1276", lat: "51.5074" },
  { name: "Paris", lon: "2.3522", lat: "48.8566" },
  { name: "Berlin", lon: "13.4050", lat: "52.5200" },
  { name: "Rome", lon: "12.4964", lat: "41.9028" },
  { name: "Madrid", lon: "-3.7038", lat: "40.4168" },
  { name: "Athens", lon: "23.7275", lat: "37.9838" },
  { name: "Vienna", lon: "16.3738", lat: "48.2082" },
  { name: "Amsterdam", lon: "4.904", lat: "52.367", country: "Netherlands" },
  { name: "Ankara", lon: "32.859", lat: "39.933", country: "Turkey" },
  { name: "Åstorp", lon: "12.945", lat: "56.134", country: "Sweden" },
  { name: "Belfast", lon: "-5.930", lat: "54.597", country: "Northern Ireland" },
  { name: "Barcelona", lon: "2.168", lat: "41.387", country: "Spain" },
  { name: "Bern", lon: "7.447", lat: "46.948", country: "Switzerland" },
  { name: "Bilbao", lon: "-2.935", lat: "43.263", country: "Spain" },
  { name: "Brussels", lon: "4.357", lat: "50.847", country: "Belgium" },
  { name: "Bucharest", lon: "19.040", lat: "47.497", country: "Romania" },
  { name: "Budapest", lon: "18.068", lat: "59.329", country: "Hungary" },
  { name: "Cardiff", lon: "-3.168", lat: "51.483", country: "Wales" },
  { name: "Cologne", lon: "6.96", lat: "50.937", country: "Germany" },
  { name: "Copenhagen", lon: "12.568", lat: "55.676", country: "Denmark" },
  { name: "Cork", lon: "-8.475", lat: "51.898", country: "Ireland" },
  { name: "Dublin", lon: "-6.2603", lat: "53.3498", country: "Ireland" },
  { name: "Edinburgh", lon: "-3.188", lat: "55.953", country: "Scotland" },
  { name: "Florence", lon: "11.255", lat: "43.7696", country: "Italy" },
  { name: "Frankfurt", lon: "8.682", lat: "50.110", country: "Germany" },
  { name: "French Riviera", lon: "6.637", lat: "43.254", country: "France" },
  { name: "Funchal", lon: "-16.908", lat: "32.650", country: "Portugal" },
  { name: "Gibraltar", lon: "-5.353", lat: "36.140" },
  { name: "Gothenburg", lon: "11.974", lat: "57.708", country: "Sweden" },
  { name: "Hamburg", lon: "9.987", lat: "53.548", country: "Germany" },
  { name: "Helsinki", lon: "24.938", lat: "60.169", country: "Finland" },
  { name: "Ibiza", lon: "1.482", lat: "39.020", country: "Spain" },
  { name: "Kyiv", lon: "30.523", lat: "50.450", country: "Ukraine" },
  { name: "Lillehammer", lon: "10.466", lat: "61.115", country: "Norway" },
  { name: "Lisbon", lon: "-9.139", lat: "38.722", country: "Portugal" },
  { name: "Manchester", lon: "-2.242", lat: "53.480", country: "England" },
  { name: "Marseille", lon: "5.369", lat: "43.296", country: "France" },
  { name: "Maspalomas", lon: "-15.586", lat: "27.760", country: "Spain" },
  { name: "Milan", lon: "9.190", lat: "45.464", country: "Italy" },
  { name: "Munich", lon: "11.582", lat: "48.135", country: "Germany" },
  { name: "Naples", lon: "14.268", lat: "40.851", country: "Italy" },
  { name: "Oñati", lon: "-2.417", lat: "43.034", country: "Spain" },
  { name: "Oslo", lon: "10.752", lat: "59.913", country: "Norway" },
  { name: "Prague", lon: "14.437", lat: "50.075", country: "Czech Republic" },
  { name: "Reykjavík", lon: "-21.942", lat: "64.146", country: "Iceland" },
  { name: "Riga", lon: "24.603", lat: "56.879", country: "Latvia" },
  { name: "Santa Cruz das Flores", lon: "-31.127", lat: "39.453", country: "Portugal" },
  { name: "Santa Cruz de Tenerife", lon: "-16.251", lat: "28.463", country: "Spain" },
  { name: "Skye", lon: "-6.215", lat: "57.273", country: "Scotland" },
  { name: "Sofia", lon: "23.321", lat: "42.697", country: "Bulgaria" },
  { name: "Stockholm", lon: "18.068", lat: "59.329", country: "Sweden" },
  { name: "Tallinn", lon: "24.753", lat: "59.437", country: "Estonia" },
  { name: "Vienna", lon: "16.373", lat: "18.208", country: "Austria" },
  { name: "Warsaw", lon: "21.012", lat: "52.229", country: "Poland" },
  { name: "York", lon: "-1.07", lat: "53.961", country: "England" },
  { name: "Zurich", lon: "8.541", lat: "47.376", country: "Switzerland" },
]

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

        const weatherImageSrc = `images/${dayConditions}.png`;

        const weatherHTML = `
          <h2>${currentDate}</h2>
          <p>Day Temperature: ${dayTemperature}°C</p>
          <p>Night Temperature: ${nightTemperature}°C</p>
          <p>Weather conditions now: ${dayConditions}</p>
          <img src="${weatherImageSrc}" alt="Weather Image">
        `;

        weatherInfo.innerHTML = weatherHTML;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }