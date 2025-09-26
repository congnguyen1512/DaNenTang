import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, MapPin, Thermometer, Eye, Wind, Droplets, Search, RefreshCw } from 'lucide-react';
import './App.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Da Nang');
  const [searchCity, setSearchCity] = useState('');

  // API key demo - trong thực tế bạn cần đăng ký tại openweathermap.org
  const API_KEY = '79c053539c1fc9a2cd341caf66179252';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Mock data để demo ứng dụng
  const mockWeatherData = {
    name: 'Da Nang',
    main: {
      temp: 28,
      feels_like: 32,
      humidity: 75,
      pressure: 1013
    },
    weather: [
      {
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d'
      }
    ],
    wind: {
      speed: 3.5
    },
    visibility: 10000
  };

  const mockForecastData = {
    list: [
      {
        dt: Date.now() / 1000 + 3600 * 3,
        main: { temp: 26 },
        weather: [{ main: 'Rain', icon: '10d' }],
        dt_txt: '2024-01-01 15:00:00'
      },
      {
        dt: Date.now() / 1000 + 3600 * 6,
        main: { temp: 24 },
        weather: [{ main: 'Clouds', icon: '03d' }],
        dt_txt: '2024-01-01 18:00:00'
      },
      {
        dt: Date.now() / 1000 + 3600 * 9,
        main: { temp: 22 },
        weather: [{ main: 'Clear', icon: '01n' }],
        dt_txt: '2024-01-01 21:00:00'
      },
      {
        dt: Date.now() / 1000 + 3600 * 12,
        main: { temp: 20 },
        weather: [{ main: 'Clear', icon: '01n' }],
        dt_txt: '2024-01-02 00:00:00'
      },
      {
        dt: Date.now() / 1000 + 3600 * 15,
        main: { temp: 25 },
        weather: [{ main: 'Sun', icon: '01d' }],
        dt_txt: '2024-01-02 03:00:00'
      }
    ]
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="weather-icon sun" />;
      case 'clouds':
        return <Cloud className="weather-icon clouds" />;
      case 'rain':
        return <CloudRain className="weather-icon rain" />;
      case 'snow':
        return <CloudSnow className="weather-icon snow" />;
      default:
        return <Sun className="weather-icon sun" />;
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      // Trong thực tế, bạn sẽ gọi API thật:
      // const weatherResponse = await fetch(`${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      // const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
      
      // Giả lập API call với delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sử dụng mock data
      const weatherData = { ...mockWeatherData, name: cityName };
      const forecastData = mockForecastData;

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
    } catch (err) {
      setError('Không thể tải dữ liệu thời tiết');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
      setSearchCity('');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Trong thực tế sẽ dùng lat/lon để gọi API
          fetchWeather('Da Nang'); // Mock location
        },
        (error) => {
          setError('Không thể lấy vị trí hiện tại');
        }
      );
    } else {
      setError('Trình duyệt không hỗ trợ định vị');
    }
  };

  useEffect(() => {
    fetchWeather('Da Nang');
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <RefreshCw className="loading-spinner" />
          <p className="loading-text">Đang tải dữ liệu thời tiết...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header với tìm kiếm */}
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Tìm kiếm thành phố..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="search-input"
              />
            </div>
            <button
              onClick={(e) => handleSearch(e)}
              className="search-btn"
            >
              <Search className="btn-icon" />
            </button>
            <button
              onClick={getCurrentLocation}
              className="location-btn"
            >
              <MapPin className="btn-icon" />
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {weather && (
          <>
            {/* Thông tin thời tiết hiện tại */}
            <div className="weather-card">
              <div className="weather-header">
                <div className="city-info">
                  <MapPin className="location-icon" />
                  <h1 className="city-name">{weather.name}</h1>
                </div>
                <p className="weather-desc">{weather.weather[0].description}</p>
              </div>

              <div className="weather-main">
                {getWeatherIcon(weather.weather[0].main)}
                <div className="temp-info">
                  <div className="main-temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="feels-like">
                    Cảm giác như {Math.round(weather.main.feels_like)}°C
                  </div>
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="weather-details">
                <div className="detail-item">
                  <Thermometer className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Áp suất</div>
                    <div className="detail-value">{weather.main.pressure} hPa</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Droplets className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Độ ẩm</div>
                    <div className="detail-value">{weather.main.humidity}%</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Wind className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Gió</div>
                    <div className="detail-value">{weather.wind.speed} m/s</div>
                  </div>
                </div>
                <div className="detail-item">
                  <Eye className="detail-icon" />
                  <div className="detail-content">
                    <div className="detail-label">Tầm nhìn</div>
                    <div className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dự báo thời tiết */}
            {forecast && (
              <div className="forecast-card">
                <h2 className="forecast-title">Dự báo 24 giờ tới</h2>
                <div className="forecast-list">
                  {forecast.list.slice(0, 5).map((item, index) => (
                    <div key={index} className="forecast-item">
                      <div className="forecast-info">
                        {getWeatherIcon(item.weather[0].main)}
                        <div className="forecast-details">
                          <div className="forecast-time">
                            {formatTime(item.dt)}
                          </div>
                          <div className="forecast-desc">
                            {item.weather[0].main}
                          </div>
                        </div>
                      </div>
                      <div className="forecast-temp">
                        {Math.round(item.main.temp)}°C
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="app-footer">
          <p>Weather PWA © 2024</p>
          <p>Dữ liệu từ OpenWeatherMap API</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;