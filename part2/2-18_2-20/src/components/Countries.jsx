import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    setSelectedCountry(null);
    setWeather(null);
  }, [countries]);

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

      axios
        .get(api)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((e) => {
          console.log("Error fetching weather data:", e);
        });
    }
  }, [selectedCountry, apiKey]);

  useEffect(() => {
    if (countries.length === 1) {
      setSelectedCountry(countries[0]);
    }
  }, [countries]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (selectedCountry) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>capital {selectedCountry.capital[0]}</p>
        <p>area {selectedCountry.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={selectedCountry.flags.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          width="200"
        />
        {weather && (
          <div>
            <h3>Weather in {selectedCountry.capital[0]}</h3>
            <p>temperature {weather.main.temp} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={"Weather icon"}
            />
            <p>wind {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
            {country.name.common}{" "}
            <button
              onClick={() => {
                setSelectedCountry(country);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Countries;
