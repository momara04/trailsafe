import { Router } from 'express';
import { db, nanoid } from '../db.js';

export const hikes = Router();

// Create or start a hike
hikes.post('/', (req, res) => {
  const { userId, name, startNow = true } = req.body;
  const id = nanoid();
  const startedAt = startNow ? new Date().toISOString() : null;
  db.prepare(`INSERT INTO hikes(id,userId,name,status,startedAt) VALUES(?,?,?,?,?)`)
    .run(id, userId, name, startNow ? 'live' : 'planned', startedAt);
  res.json({ id, status: startNow ? 'live' : 'planned', startedAt });
});

// List user's hikes (active + recent)
hikes.get('/', (req, res) => {
  const { userId } = req.query;
  const rows = db.prepare(`SELECT * FROM hikes WHERE userId=? ORDER BY startedAt DESC`).all(userId);
  res.json(rows);
});

// Post waypoint (live tracking)
hikes.post('/:id/waypoints', (req, res) => {
  const { id } = req.params;
  const { ts, lat, lng, elevM, gpsAccM } = req.body;
  const wpId = nanoid();
  db.prepare(`INSERT INTO waypoints(id,hikeId,ts,lat,lng,elevM,gpsAccM) VALUES(?,?,?,?,?,?,?)`)
    .run(wpId, id, ts || new Date().toISOString(), lat, lng, elevM ?? null, gpsAccM ?? null);
  res.json({ id: wpId });
});

// Complete a hike
hikes.post('/:id/complete', (req, res) => {
  const { id } = req.params;
  const { distanceKm=0, elevationGainM=0, avgSpeedKmh=0 } = req.body;
  db.prepare(`UPDATE hikes SET status='completed', endedAt=?, distanceKm=?, elevationGainM=?, avgSpeedKmh=? WHERE id=?`)
    .run(new Date().toISOString(), distanceKm, elevationGainM, avgSpeedKmh, id);
  res.json({ ok: true });
});
