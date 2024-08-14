import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=4&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Hava Durumu Uygulaması</h1>
        <div className="input-container">
          <input
            className="location-input"
            type="text"
            placeholder="Şehir girin"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day, index) => (
            <div key={index} className="forecast-day">
              <h3>{day.date}</h3>
              <p>Sıcaklık: {day.day.avgtemp_c}°C</p>
              <p>Durum: {day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt="Weather Icon" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
