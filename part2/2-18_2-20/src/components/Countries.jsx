import { useState, useEffect } from "react";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setSelectedCountry(null);
  }, [countries]);

  const countryDetails = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />
    </div>
  );

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return countryDetails(countries[0]);
  } else if (selectedCountry) {
    return countryDetails(selectedCountry);
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
