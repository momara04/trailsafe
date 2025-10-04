export type Hike = {
  id: string;
  userId: string;
  name: string;
  status: 'planned' | 'live' | 'completed';
  startedAt?: string;
  endedAt?: string;
  distanceKm?: number;
  elevationGainM?: number;
  avgSpeedKmh?: number;
};

export type Waypoint = {
  id: string;
  hikeId: string;
  ts: string;
  lat: number;
  lng: number;
  elevM?: number;
  gpsAccM?: number;
};

export type AnalyzeSample = {
  ts: string;
  lat?: number;
  lng?: number;
  elevM?: number;
  speedKmh?: number;
  vertRateMps?: number;
  bearingDeg?: number;
  accel?: number;
};

export type AnalyzeResult = {
  triggered: boolean;
  type?: 'unusual_speed' | 'elevation_drop' | 'extended_idleness' | 'erratic_heading';
  score?: number;
  details?: Record<string, number>;
};

export type Weather = {
  tempF: number;
  condition: string;
  humidity: number;
  windMph: number;
  hourly?: { h: string; t: number }[];
};

export type Trail = {
  id: string;
  name: string;
  desc: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  distanceKm: number;
  elevFt: number;
  durationH: number;
  rating: number;
  tags: string[];
};

export type WildlifeSighting = {
  id: string;
  species: string;
  severity: 'low' | 'medium' | 'high';
  note: string;
  trail: string;
  distanceKm: number;
  agoMin: number;
};
