import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
import LoadingScreen from "@/components/LoadingScreen";

const BACKEND_API_URL = process.env.BACKEND_API_URL;
// Fetch cities and weather conditions from environment variables
const cities = process.env.CITIES.split(",");

const WeatherHistory = () => {
  const [city, setCity] = useState("Hyderabad");
  const [history, setHistory] = useState([]);
  const [dayHistory, setDayHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2024-10-21");
  const [days, setDays] = useState(2);
  const [dailySummary, setDailySummary] = useState(null);
  const [loadHistory, setLoadHistory] = useState(true);
  const [loadDayHistory, setLoadDayHistory] = useState(true);

  console.log(dayHistory);

  // Fetch weather history
  const fetchWeatherHistory = async () => {
    setLoadHistory(true);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/weather/latest-history`,
        {
          params: { city, days },
        }
      );
      setHistory(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch weather history", "error");
    } finally {
      setLoadHistory(false);
    }
  };

  // Fetch weather history
  const fetchWeatherHistoryByDate = async () => {
    setLoadDayHistory(true);
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/weather/history-date`,
        {
          params: { city, date: selectedDate },
        }
      );
      setDayHistory(response.data);
    } catch (error) {
      Swal.fire("Error", "Could not fetch weather history", "error");
    } finally {
      setLoadDayHistory(false);
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

  useEffect(() => {
    fetchWeatherHistoryByDate();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Prepare data for graph
  const prepareGraphData = () => {
    return dayHistory
      .slice()
      .reverse()
      .map((day) => ({
        date: day.date,
        maxTemp: day.maxTemp.toFixed(2),
        avgTemp: day.avgTemp.toFixed(2),
        minTemp: day.minTemp.toFixed(2),
        avgHumidity: day.avgHumidity.toFixed(2),
        avgWindSpeed: day.avgWindSpeed.toFixed(2),
      }));
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3 w-100">
        <div className="d-flex flex-row align-items-center">
          <Image
            src={`/Time.gif`}
            alt="history"
            width={55}
            height={55}
            className="me-2"
          />
          <div style={{ fontWeight: "400", fontSize: 38 }}>Weather History</div>
        </div>
        <div>
          <select
            className="form-select shadow border-0"
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

      <div className="d-flex flex-column align-items-center shadow rounded border-0 p-5 w-100 mb-3" style={{background:'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'}}>
        <div className="d-flex flex-row justify-content-center w-50">
          <div htmlFor="date-picker" className="">
            Select Date:
          </div>
          <input
            type="date"
            id="date-picker"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
            // Ensure that the date input is in the YYYY-MM-DD format
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>
        {loadDayHistory ? (
          <LoadingScreen />
        ) : (
          history.length > 0 && (
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
                    <Line
                      type="monotone"
                      dataKey="avgHumidity"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="card border-0 shadow p-3 mt-5 w-100">
                <h5 className="px-4 py-2">Wind Speed Trends for {city}</h5>
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
                    <Line
                      type="monotone"
                      dataKey="avgWindSpeed"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        )}
      </div>

      <div className="shadow rounded border-0 p-3 w-100 ">
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

        {history.length > 0 && (
          <div
            className="card border-0 shadow mt-4 w-100 p-5"
            style={{
              background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
            }}
          >
            {loadHistory ? (
              <LoadingScreen />
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherHistory;
