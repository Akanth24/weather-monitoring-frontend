// src/components/WeatherCard.js

import React, { useState } from "react";
import Image from "next/image";

const WeatherCard = ({ weather }) => {
  const [unit, setUnit] = useState("celsius"); // default unit is Kelvin

  // Function to convert temperature based on selected unit
  const convertTemperature = (temp) => {
    switch (unit) {
      case "celsius":
        return (temp - 273.15).toFixed(2); // Kelvin to Celsius
      case "fahrenheit":
        return (((temp - 273.15) * 9) / 5 + 32).toFixed(2); // Kelvin to Fahrenheit
      default:
        return temp.toFixed(2); // Kelvin
    }
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // Convert the timestamp to a readable date format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from Unix timestamp
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="rounded border-0 shadow p-5" style={{ width: "800px",backgroundColor:'#fff'}} >
      <div className="d-flex flex-column justify-content-center align-items-center px-3">
        <div className="w-100 d-flex flex-row justify-content-between align-items-end">
          <div style={{ fontSize: 32, fontWeight: "600" }}>{weather.name}</div>
          <div>
            <select
              id="unitSelect"
              className="form-select border-0"
              style={{ fontWeight: "500", fontSize: 18 }}
              value={unit}
              onChange={handleUnitChange}
            >
              <option value="kelvin">K</option>
              <option value="celsius">°C</option>
              <option value="fahrenheit">°F</option>
            </select>
          </div>
        </div>

        {/* Date display */}
        <div
          style={{ fontSize: "16px", fontWeight: "400" ,fontStyle:'italic'}}
          className="w-100 mb-2"
        >
          {formatDate(weather.dt)}
        </div>

        <div className="d-flex flex-row justify-content-around align-items-center w-100 mt-4">
          <Image
            src={`/${weather.weather[0].main}.png`} // Local image in the public folder
            alt={`${weather.weather[0].description}`}
            width={250}
            height={250}
            className="img-fluid"
          />
          <div className="d-flex flex-column justify-content-between gap-4 ">
            <div className="d-flex flex-row justify-content-center w-100">
              <div style={{ fontSize: 40}}>
                {convertTemperature(weather.main.temp)}{" "}
                {unit === "kelvin" ? "K" : unit === "celsius" ? "°C" : "°F"}
              </div>
            </div>
            <div>
              <div className="mb-3">
                <Image
                  src={`/Weather.gif`}
                  width={24}
                  height={24}
                  className="me-2"
                />
                Condition: {weather.weather[0].description}
              </div>

              <div className="mb-3">
                <Image
                  src={`/Humidity.gif`}
                  width={24}
                  height={24}
                  className="me-2"
                />
                Humidity: {weather.main.humidity} %
              </div>

              <div className="mb-3">
                <Image
                  src={`/WindSpeed.gif`}
                  width={24}
                  height={24}
                  className="me-2"
                />
                Wind Speed: {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
