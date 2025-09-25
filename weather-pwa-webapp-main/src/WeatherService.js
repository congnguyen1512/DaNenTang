export async function fetchWeather(city) {
  const apiKey = "b680a61f21a3e29688ab0c23f3f1b1ca"; // API key của bạn
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

  const res = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return await res.json();
}

