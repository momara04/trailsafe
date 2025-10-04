import { Router } from 'express';
export const wildlife = Router();

const sightings = [
  { id:'1', species:'Black Bear', severity:'high', note:'Bear spotted near trail. Keep distance, carry bear spray.',
    trail:'Summit Trail, Mile 3.2', distanceKm:0.5, agoMin:15 },
  { id:'2', species:'Mountain Lion', severity:'high', note:'Tracks spotted. Avoid hiking alone.',
    trail:'Ridge Path, North Section', distanceKm:2.1, agoMin:60 },
  { id:'3', species:'Rattlesnake', severity:'medium', note:'Sunning on rocks. Watch your step.',
    trail:'Canyon Loop Trail', distanceKm:1.3, agoMin:120 },
  { id:'4', species:'Elk Herd', severity:'medium', note:'Large herd with calves. Keep 25m distance.',
    trail:'Meadow View Trail', distanceKm:3.5, agoMin:180 },
  { id:'5', species:'Coyote Pack', severity:'low', note:'Keep pets leashed.',
    trail:'Valley Trail Junction', distanceKm:4.2, agoMin:300 }
];

wildlife.get('/', (_req,res)=> res.json(sightings));
