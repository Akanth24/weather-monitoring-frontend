// src/components/DailySummaryCard.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const DailySummaryCard = ({ city, dailySummary }) => {
  const [unit, setUnit] = useState('celsius'); // default to Celsius

  // Temperature conversion function
  const convertTemperature = (temp) => {
    switch (unit) {
      case 'kelvin':
        return (temp + 273.15).toFixed(2); // Celsius to Kelvin
      case 'fahrenheit':
        return ((temp * 9/5) + 32).toFixed(2); // Celsius to Fahrenheit
      default:
        return temp.toFixed(2); // Celsius
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">
          Daily Summary for {city} <FontAwesomeIcon icon={faHistory} />
        </h5>
        <div className="mb-3">
          <label htmlFor="unitSelect" className="form-label">Select Temperature Unit:</label>
          <select id="unitSelect" className="form-select" value={unit} onChange={handleUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="kelvin">Kelvin</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <p>Average Temperature: {convertTemperature(dailySummary.avgTemp)} {unit === 'kelvin' ? 'K' : unit === 'celsius' ? '°C' : '°F'}</p>
        <p>Max Temperature: {convertTemperature(dailySummary.maxTemp)} {unit === 'kelvin' ? 'K' : unit === 'celsius' ? '°C' : '°F'}</p>
        <p>Min Temperature: {convertTemperature(dailySummary.minTemp)} {unit === 'kelvin' ? 'K' : unit === 'celsius' ? '°C' : '°F'}</p>
        <p>Average Humidity: {dailySummary.avgHumidity}%</p>
        <p>Average Wind Speed: {dailySummary.avgWindSpeed} m/s</p>
        <p>Dominant Weather Condition: {dailySummary.dominantCondition}</p>
        <Image 
          src={`/${dailySummary.dominantCondition}.png`} 
          alt={`${dailySummary.dominantCondition}`} 
          width={500} 
          height={500} 
          className="img-fluid" 
        />
      </div>
    </div>
  );
};

export default DailySummaryCard;
