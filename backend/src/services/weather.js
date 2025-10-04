import axios from 'axios';
import { config } from '../config.js';

export async function getWeather(lat, lon) {
  if (!config.openWeatherKey) {
    // mock for demo
    return {
      tempF: 72, condition: 'Partly Cloudy', humidity: 45, windMph: 8,
      hourly: [{h: 'Now', t: 72},{h:'1PM',t:74},{h:'2PM',t:76},{h:'3PM',t:75}]
    };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${config.openWeatherKey}`;
  const { data } = await axios.get(url);
  return {
    tempF: Math.round(data.main.temp),
    condition: data.weather?.[0]?.main || 'Clear',
    humidity: data.main.humidity,
    windMph: Math.round(data.wind.speed)
  };
}
