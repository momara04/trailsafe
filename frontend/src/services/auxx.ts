import { api } from '@/lib/api';
import type { Weather, Trail, WildlifeSighting } from '@/types/api';

export const WeatherApi = {
  get: (lat: number, lng: number) => api<Weather>(`/weather?lat=${lat}&lng=${lng}`),
};

export const TrailsApi = {
  list: (q?: string, difficulty?: 'easy' | 'moderate' | 'hard') => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (difficulty) p.set('difficulty', difficulty);
    return api<Trail[]>(`/trails?${p.toString()}`);
  },
  get: (id: string) => api<Trail>(`/trails/${id}`),
};

export const WildlifeApi = {
  list: () => api<WildlifeSighting[]>(`/wildlife`),
};

export const OfflineMapsApi = {
  list: () => api<{ id: string; name: string; region: string; sizeMB: number; downloaded: boolean }[]>(`/maps`),
  toggle: (id: string) => api(`/maps/${id}/toggle`, { method: 'POST' }),
};
