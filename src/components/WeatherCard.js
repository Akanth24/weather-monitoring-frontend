// src/components/WeatherCard.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTachometerAlt, faCloud, faWater } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const WeatherCard = ({ weather }) => {
  const [unit, setUnit] = useState('kelvin'); // default unit is Kelvin

  // Function to convert temperature based on selected unit
  const convertTemperature = (temp) => {
    switch (unit) {
      case 'celsius':
        return (temp - 273.15).toFixed(2); // Kelvin to Celsius
      case 'fahrenheit':
        return ((temp - 273.15) * 9/5 + 32).toFixed(2); // Kelvin to Fahrenheit
      default:
        return temp.toFixed(2); // Kelvin
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{weather.city}</h5>
        <div className="mb-3">
          <label htmlFor="unitSelect" className="form-label">Select Temperature Unit:</label>
          <select id="unitSelect" className="form-select" value={unit} onChange={handleUnitChange}>
            <option value="kelvin">Kelvin</option>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <p className="card-text">
          <FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {convertTemperature(weather.main.temp)} {unit === 'kelvin' ? 'K' : unit === 'celsius' ? '°C' : '°F'}
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faTachometerAlt} /> Pressure: {weather.main.pressure} hPa
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faWater} /> Humidity: {weather.main.humidity} %
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faCloud} /> Condition: {weather.weather[0].description}
        </p>
        <Image 
            src={`/${weather.weather[0].main}.png`}  // Local image in the public folder
            alt={`${weather.weather[0].description}`}
            width={500}
            height={500}
            className="img-fluid"
        />
      </div>
    </div>
  );
};

export default WeatherCard;
