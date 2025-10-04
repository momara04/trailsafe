import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config.js';

import { hikes } from './routes/hikes.js';
import { safety } from './routes/safety.js';
import { trails } from './routes/trails.js';
import { maps } from './routes/maps.js';
import { weather } from './routes/weather.js';
import { wildlife } from './routes/wildlife.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

app.use('/api/hikes', hikes);
app.use('/api/safety', safety);
app.use('/api/trails', trails);
app.use('/api/maps', maps);
app.use('/api/weather', weather);
app.use('/api/wildlife', wildlife);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

app.listen(config.port, () => {
  console.log(`TrailSafe backend running on http://localhost:${config.port}`);
});
