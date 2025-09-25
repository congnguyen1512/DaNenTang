

import React, { useState, useEffect } from "react";
import { fetchWeather } from "./WeatherService";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getWeather(selectedCity) {
    if (!selectedCity) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(selectedCity);
      setWeather(data);
      localStorage.setItem("lastCity", selectedCity); // lưu thành phố gần nhất
    } catch (e) {
      setError("❌ Không tìm thấy thành phố");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const last = localStorage.getItem("lastCity");
    if (last) {
      setCity(last);
      getWeather(last);
    }
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">🌤 Weather PWA</h1>

      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Nhập tên thành phố..."
        />
        <button onClick={() => getWeather(city)}>Xem</button>
      </div>

      {loading && <p>⏳ Đang tải...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <p className="detail">
            💧 {weather.main.humidity}% • 🌬 {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}
