import { Router } from 'express';
import { db, nanoid } from '../db.js';
import { analyzeWindow } from '../services/anomaly.js';
import { notifyContacts } from '../services/notify.js';

export const safety = Router();

// post a check-in result
safety.post('/checkin', (req, res) => {
  const { hikeId, result } = req.body; // 'ok' | 'missed'
  const id = nanoid();
  db.prepare(`INSERT INTO checkins(id,hikeId,ts,result) VALUES(?,?,?,?)`)
    .run(id, hikeId, new Date().toISOString(), result);
  res.json({ id, nextCheckInAt: new Date(Date.now() + 30*60*1000).toISOString() });
});

// analyze recent movement samples
safety.post('/analyze', (req, res) => {
  const { hikeId, samples } = req.body;
  const result = analyzeWindow(samples || []);
  if (result.triggered) {
    const id = nanoid();
    db.prepare(`INSERT INTO anomalies(id,hikeId,ts,type,score,details) VALUES(?,?,?,?,?,?)`)
      .run(id, hikeId, new Date().toISOString(), result.type, result.score, JSON.stringify(result.details));
  }
  res.json(result);
});

// escalate (send to contacts)
safety.post('/escalate', async (req, res) => {
  const { hikeId, contacts, lastKnown } = req.body;
  const message = `TrailSafe: No response from hiker. Last seen ${lastKnown.ts} at ${lastKnown.lat},${lastKnown.lng}. Battery ${lastKnown.battery ?? '?'}%.`;
  const out = await notifyContacts({ contacts, message, location: lastKnown });
  res.json({ ok: true, delivery: out });
});
