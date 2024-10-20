// pages/weather.js
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from '@/components/WeatherCard';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const WeatherPage = () => {
  const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
  const [selectedCity, setSelectedCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Fetching weather data for the selected or custom city
  const fetchWeather = async () => {
    const cityToFetch = selectedCity || customCity;
    if (!cityToFetch) {
      setError('Please select a city or enter a city name.');
      return;
    }
    try {
      const response = await axios.get(`${BACKEND_API_URL}/weather/city/${cityToFetch}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(`Could not fetch weather data for ${cityToFetch}`);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <div className="form-group">
        <label htmlFor="citySelect">Select a City</label>
        <select
          className="form-control"
          id="citySelect"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setCustomCity(''); // Clear custom city when selecting from dropdown
          }}
        >
          <option value="">Choose...</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="customCity">Or Enter a City Name</label>
        <input
          type="text"
          className="form-control"
          id="customCity"
          value={customCity}
          onChange={(e) => {
            setCustomCity(e.target.value);
            setSelectedCity(''); // Clear selected city when typing
          }}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={fetchWeather}>
        <FontAwesomeIcon icon={faSearch} /> Get Weather
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {weatherData && (
        <WeatherCard weather={weatherData}/>
      )}
    </div>
  );
};

export default WeatherPage;
