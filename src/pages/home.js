import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from '@/components/WeatherCard';
import DailySummaryCard from '@/components/DailySummaryCard';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const Home = () => {
  const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
  const [city, setCity] = useState('Hyderabad');
  const [weatherData, setWeatherData] = useState(null);

  const [dailySummary, setDailySummary] = useState(null);
  const [error, setError] = useState(null);

  // Fetching weather data for the selected or custom city
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/weather/city/${city}`);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(`Could not fetch weather data for ${city}`);
    }
  };

  // Fetch daily weather summary
  const fetchDailySummary = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/weather/daily-summary`, { params: { city } });
      setDailySummary(response.data);
    } catch (error) {
      Swal.fire('Error', 'Could not fetch daily weather summary', 'error');
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchDailySummary();
  }, [city]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">
        <FontAwesomeIcon icon={faCloudSun} /> Weather Dashboard
      </h1>

      <div className="form-group mt-4">
        <label htmlFor="city">Select City:</label>
        <select
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
  
      {/* Weather Data */}
      {weatherData && (
        <WeatherCard weather={weatherData}/>
      )}

      {/* Daily Summary */}
      {dailySummary && <DailySummaryCard city={city} dailySummary={dailySummary}/> }
    </div>
  );
};

export default Home;
