import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import WeatherCard from "@/components/WeatherCard";
import DailySummaryCard from "@/components/DailySummaryCard";
import Image from "next/image";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const Home = () => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);

  const [dailySummary, setDailySummary] = useState(null);
  const [error, setError] = useState(null);

  // Fetching weather data for the selected or custom city
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/weather/city/${city}`
      );
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
      const response = await axios.get(
        `${BACKEND_API_URL}/weather/daily-summary`,
        { params: { city } }
      );
      setDailySummary(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch daily weather summary", "error");
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchDailySummary();
  }, [city]);

  return (
      <div className="container my-5 d-flex flex-column align-items-center">
        <div className="d-flex flex-row justify-content-between align-items-center mb-5 w-100">
          <div className="d-flex flex-row align-items-center">
            <Image
              src={`/WeatherHeader.gif`}
              width={55}
              height={55}
              className="me-2"
            />
            <div style={{ fontWeight: "bold", fontSize: 38 }}>
              Weather Dashboard
            </div>
          </div>
          <div>
            <select
              className="form-select"
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
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Weather Data */}
        {weatherData && <WeatherCard weather={weatherData} />}
      </div>
  );
};

export default Home;
