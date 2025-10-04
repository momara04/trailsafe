import { Router } from 'express';
import { listTrails, getTrail } from '../services/trails.js';

export const trails = Router();
trails.get('/', (req,res)=>{
  const { q, difficulty } = req.query;
  res.json(listTrails({ q, difficulty }));
});
trails.get('/:id', (req,res)=>{
  const t = getTrail(req.params.id);
  if (!t) return res.status(404).json({ error:'not_found' });
  res.json(t);
});
