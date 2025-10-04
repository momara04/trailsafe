import { Router } from 'express';
import { getWeather } from '../services/weather.js';
export const weather = Router();

weather.get('/', async (req, res) => {
  const { lat, lng } = req.query;
  const data = await getWeather(lat, lng);
  res.json(data);
});
