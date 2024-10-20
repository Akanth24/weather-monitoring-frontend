import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const WeatherHistory = () => {
  const [city, setCity] = useState('Delhi');
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(5);

  // Fetch weather history
  const fetchWeatherHistory = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/weather/history`, { params: { city, days } });
      setHistory(response.data);
    } catch (error) {
      Swal.fire('Error', 'Could not fetch weather history', 'error');
    }
  };

  useEffect(() => {
    fetchWeatherHistory();
  }, [city, days]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">
        <FontAwesomeIcon icon={faHistory} /> Weather History
      </h1>

      <div className="form-group mt-4">
        <label htmlFor="city">Select City:</label>
        <select
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <div className="form-group mt-4">
        <label htmlFor="days">Select Days of History:</label>
        <select
          className="form-control"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        >
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option value="5">5 Days</option>
          <option value="7">7 Days</option>
        </select>
      </div>

      {history.length > 0 && (
        <div className="mt-4">
          <h5>Weather History for {city} (Past {days} Days)</h5>
          <ul className="list-group">
            {history.map((day, index) => (
              <li key={index} className="list-group-item">
                <strong>Date: {day.date}</strong>
                <p>Avg Temperature: {day.avgTemp} °C</p>
                <p>Max Temperature: {day.maxTemp} °C</p>
                <p>Min Temperature: {day.minTemp} °C</p>
                <p>Average Humidity: {day.avgHumidity}%</p>
                <p>Average Wind Speed: {day.avgWindSpeed} m/s</p>
                <p>Dominant Weather Condition: {day.dominantCondition}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherHistory;
