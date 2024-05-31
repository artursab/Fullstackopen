import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
        setError(null);

        // Automatically select country if there's exactly one match
        if (filtered.length === 1) {
          setSelectedCountry(filtered[0]);
        } else {
          setSelectedCountry(null);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFilteredCountries([]);
        setError('Error fetching data. Please try again later.');
      });
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null); // Reset selected country when search term changes
  };

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h2>Country Information</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {error ? <p>{error}</p> : <CountryList countries={filteredCountries} handleShowDetails={handleShowDetails} />}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Search for a country: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const CountryList = ({ countries, handleShowDetails }) => {
  if (!countries || countries.length === 0) {
    return <p>No matching countries found.</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    // Automatically show details if only one country matches
    return null;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShowDetails(country)}>
            Show Details
          </button>
        </li>
      ))}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: country.capital[0],
            appid: '', // Replace API key
            units: 'metric'
          }
        });
        setWeather(response.data);
        setWeatherError(null);
      } catch (error) {
        setWeather(null);
        setWeatherError('Error fetching weather data');
      }
    };

    fetchWeather();
  }, [country.capital]);

  const languages = Object.values(country.languages).join(', ');

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {languages}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
      
      {weather ? (
        <div>
          <h4>Weather in {country.capital}</h4>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : weatherError ? (
        <p>{weatherError}</p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default App;
