# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



# 🌦 Weather App (React + Vite + PWA)

Ứng dụng dự báo thời tiết đơn giản, sử dụng **OpenWeatherMap API**.  
Hỗ trợ **PWA (Progressive Web App)** với **offline mode** thông qua Service Worker.

---

## 🚀 Tính năng
- Hiển thị thời tiết hiện tại theo vị trí hoặc thành phố nhập vào.
- Giao diện responsive, dễ sử dụng.
-  **PWA**
- Chạy được **offline** với trang fallback `offline.html`.

---

## 📦 Cài đặt & Chạy Project

### 1. Clone dự án
```bash
git clone https://github.com/<your-username>/weather-app.git
cd weather-app

### 2. Cài đặt dependencies 
npm install
### 3. Chạy ở chế độ dev
npm run dev



🔑 Cấu hình API Key

Ứng dụng dùng OpenWeatherMap.

Tạo tài khoản và lấy API key tại: https://openweathermap.org/api

Trong WeatherService.js thay bằng API key của bạn .

 const apiKey = "your_api_key_here"; // API key của bạn



📂 Cấu trúc thư mục chính
weather-app/
│── public/
│   ├── sw.js           # Service Worker (cache offline)
│   ├── offline.html    # Trang hiển thị khi offline
│   ├── manifest.json   # Cấu hình PWA
│── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── WeatherService.js
│── package.json
│── vite.config.js
