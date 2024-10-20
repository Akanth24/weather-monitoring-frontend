import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import DailySummaryCard from "@/components/DailySummaryCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

const WeatherHistory = () => {
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  const [city, setCity] = useState("Hyderabad");
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(2);
  const [dailySummary, setDailySummary] = useState(null);

  // Fetch weather history
  const fetchWeatherHistory = async () => {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/weather/history`, {
        params: { city, days },
      });
      setHistory(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch weather history", "error");
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
    fetchWeatherHistory();
    fetchDailySummary();
  }, [city, days]);

  // Prepare data for graph
  const prepareGraphData = () => {
    return history.map((day) => ({
      date: day.date,
      maxTemp: day.maxTemp,
      avgTemp: day.avgTemp,
      minTemp: day.minTemp,
      avgHumidity: day.avgHumidity,
    }));
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center mb-5 w-100">
        <div className="d-flex flex-row align-items-center">
          <Image src={`/Time.gif`} width={55} height={55} className="me-2" />
          <div style={{ fontWeight: "bold", fontSize: 38 }}>
            Weather History
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

      {/* Daily Summary */}
      {dailySummary && (
        <DailySummaryCard city={city} dailySummary={dailySummary} />
      )}

      {history.length > 0 && (
        <div className="w-100">
        <div className="card border-0 shadow p-3 mt-5 w-100">
          <h5 className="px-4 py-2">Temperature Trends for {city}</h5>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={prepareGraphData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              
              <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d" />
              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="minTemp" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card border-0 shadow p-3 mt-5 w-100">
          <h5 className="px-4 py-2">Humidity Trends for {city}</h5>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={prepareGraphData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgHumidity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        </div>
      )}

      {/* Days Selection */}
      <div className="form-group mt-4 w-100">
        <label htmlFor="days">Select Days of History:</label>
        <select
          className="form-select"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        >
          <option value="1">1 Day</option>
          <option value="2">2 Days</option>
          <option value="3">3 Days</option>
          <option value="5">5 Days</option>
          <option value="7">7 Days</option>
        </select>
      </div>

      {/* Weather Cards for Each Day */}
      {history.length > 0 && (
        <div
          className="card border-0 shadow mt-4 w-100 p-5"
          style={{
            background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
          }}
        >
          <h5 className="px-4 mb-5">
            Weather History for {city} (Past {days} Days)
          </h5>
          <div
            className="d-flex flex-row gap-3 w-100 rounded shadow p-1"
            style={{ overflowX: "scroll" }}
          >
            {history.map((day, index) => (
              <div key={index}>
                <DailySummaryCard city={city} dailySummary={day} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherHistory;
