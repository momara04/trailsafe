const TRAILS = [
  { id:'summit-peak', name:'Summit Peak Trail', desc:'Mountain ridge with steep inclines', difficulty:'hard',
    distanceKm:12.5, elevFt:2840, durationH:6, rating:4.8, tags:['Scenic Views','Wildlife','Waterfall'] },
  { id:'forest-loop', name:'Forest Loop Trail', desc:'Gentle forest path with minimal elevation', difficulty:'easy',
    distanceKm:5.2, elevFt:420, durationH:2, rating:4.6, tags:['Family Friendly','Shaded','Flat Terrain'] },
  { id:'canyon-ridge', name:'Canyon Ridge Trail', desc:'Mixed terrain with moderate climbs', difficulty:'moderate',
    distanceKm:8.7, elevFt:1250, durationH:4, rating:4.7, tags:['Rock Formations','Canyon Views','Photography'] },
];

export function listTrails({ q='', difficulty } = {}) {
  const ql = q.toLowerCase();
  return TRAILS.filter(t =>
    (!difficulty || t.difficulty === difficulty) &&
    (!q || t.name.toLowerCase().includes(ql) || t.desc.toLowerCase().includes(ql))
  );
}

export function getTrail(id){ return TRAILS.find(t => t.id === id); }
