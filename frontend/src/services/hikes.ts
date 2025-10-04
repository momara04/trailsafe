import { api } from '../lib/api';
import type { Hike, AnalyzeSample, AnalyzeResult, Waypoint } from '../types/api';

export const Hikes = {
  list: (userId: string) => api<Hike[]>(`/hikes?userId=${encodeURIComponent(userId)}`),
  start: (userId: string, name: string) =>
    api<{ id: string; status: Hike['status']; startedAt?: string }>(`/hikes`, {
      method: 'POST',
      body: { userId, name, startNow: true },
    }),
  addWaypoint: (hikeId: string, wp: Omit<Waypoint, 'id' | 'hikeId'>) =>
    api<{ id: string }>(`/hikes/${hikeId}/waypoints`, { method: 'POST', body: wp }),
  complete: (hikeId: string, body: Partial<Hike>) =>
    api<{ ok: true }>(`/hikes/${hikeId}/complete`, { method: 'POST', body }),
};

export const Safety = {
  analyze: (hikeId: string, samples: AnalyzeSample[]) =>
    api<AnalyzeResult>(`/safety/analyze`, { method: 'POST', body: { hikeId, samples } }),
  checkIn: (hikeId: string, result: 'ok' | 'missed') =>
    api<{ id: string; nextCheckInAt: string }>(`/safety/checkin`, {
      method: 'POST',
      body: { hikeId, result },
    }),
  escalate: (
    hikeId: string,
    contacts: { id: string; name: string; phone?: string; email?: string }[],
    lastKnown: { ts: string; lat: number; lng: number; battery?: number }
  ) => api<{ ok: true }>(`/safety/escalate`, { method: 'POST', body: { hikeId, contacts, lastKnown } }),
};
