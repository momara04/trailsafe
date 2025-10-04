import { Router } from 'express';
export const maps = Router();

const packages = [
  { id:'rmnp', name:'Rocky Mountain National Park', region:'Colorado', sizeMB:245, downloaded:true, updatedDaysAgo:2 },
  { id:'yosemite', name:'Yosemite Valley Trails', region:'California', sizeMB:312, downloaded:true, updatedDaysAgo:7 },
  { id:'grand-canyon-nr', name:'Grand Canyon - North Rim', region:'Arizona', sizeMB:189, downloaded:false },
  { id:'zion', name:'Zion National Park', region:'Utah', sizeMB:156, downloaded:false },
  { id:'gsmnp', name:'Great Smoky Mountains', region:'TN/NC', sizeMB:278, downloaded:false },
];

maps.get('/', (_req,res)=> res.json(packages));
maps.post('/:id/toggle', (req,res)=>{
  const p = packages.find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error:'not_found' });
  p.downloaded = !p.downloaded;
  res.json(p);
});
