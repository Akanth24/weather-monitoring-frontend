import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const weatherConditions = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Clear",
  "Clouds",
  "Mist",
  "Smoke",
  "Haze",
  "Dust",
  "Fog",
  "Sand",
  "Ash",
  "Squall",
  "Tornado"
];

const ThresholdForm = () => {
  const [city, setCity] = useState('');
  const [temperatureThreshold, setTemperatureThreshold] = useState('');
  const [email, setEmail] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [unit, setUnit] = useState('Celsius');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert temperature to Celsius if it's in Kelvin
    let tempInCelsius = temperatureThreshold;
    if (unit === 'Kelvin') {
      tempInCelsius = temperatureThreshold - 273.15;
    }

    // Prepare data to send to the API
    const data = {
      city,
      temperatureThreshold: tempInCelsius,
      email,
      weatherCondition,
    };

    try {
      await axios.post(`${BACKEND_API_URL}/weather/threshold`, data);
      Swal.fire('Success', 'Threshold set successfully!', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to set threshold', 'error');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        <FontAwesomeIcon icon={faCloud} /> Set Weather Alert Threshold
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <select
            className="form-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select a city</option>
            {cities.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="temperatureThreshold" className="form-label">
            Temperature Threshold ({unit === 'Celsius' ? '°C' : 'K'})
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={temperatureThreshold}
              onChange={(e) => setTemperatureThreshold(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Bootstrap Toggle Switch for Celsius/Kelvin */}
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="unitToggle"
            checked={unit === 'Kelvin'}
            onChange={() => setUnit(unit === 'Celsius' ? 'Kelvin' : 'Celsius')}
          />
          <label className="form-check-label" htmlFor="unitToggle">
            Toggle to {unit === 'Celsius' ? 'Kelvin' : 'Celsius'}
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email for Alerts</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="weatherCondition" className="form-label">Weather Condition</label>
          <select
            className="form-select"
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e.target.value)}
          >
            <option value="">Select a condition (optional)</option>
            {weatherConditions.map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          <FontAwesomeIcon icon={faThermometerHalf} /> Set Threshold
        </button>
      </form>
    </div>
  );
};

export default ThresholdForm;
