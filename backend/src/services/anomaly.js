/**
 * Compute anomaly score from a stream of samples.
 * Each sample: { ts, lat, lng, elevM, speedKmh, vertRateMps, bearingDeg, accel }
 * Returns { triggered: boolean, type, score, details }
 */
export function analyzeWindow(samples) {
  if (!samples?.length) return { triggered: false };

  // Baselines
  const speeds = samples.map(s => s.speedKmh || 0);
  const mean = speeds.reduce((a,b)=>a+b,0) / Math.max(speeds.length,1);
  const maxSpeed = Math.max(...speeds);

  // Rule 1: unusual speed-up
  const speedUp = maxSpeed > Math.max(8, 3 * mean); // >8 km/h or >3x baseline
  // Rule 2: abrupt elevation drop
  const drop = Math.min(...samples.map(s => s.vertRateMps ?? 0)) < -2.5; // <-2.5 m/s
  // Rule 3: extended idleness (no movement > 3 min) while prior movement existed
  const movedBefore = mean > 0.8;
  const idleDurSec = idleDuration(samples);
  const idle = movedBefore && idleDurSec > 180;
  // Rule 4: erratic heading changes (variance spike)
  const headingVar = variance(samples.map(s=>s.bearingDeg ?? 0));
  const erratic = headingVar > 8000;

  const score =
    (speedUp ? 0.35 : 0) +
    (drop ? 0.35 : 0) +
    (idle ? 0.2 : 0) +
    (erratic ? 0.1 : 0);

  if (score >= 0.5) {
    const type = speedUp ? 'unusual_speed' :
                 drop ? 'elevation_drop' :
                 idle ? 'extended_idleness' :
                 'erratic_heading';
    return { triggered: true, type, score, details: { mean, maxSpeed, idleDurSec, headingVar } };
  }
  return { triggered: false, score };
}

function idleDuration(samples){
  const moving = samples.filter(s => (s.speedKmh||0) > 0.5);
  if (!moving.length) return 0;
  const last = samples[samples.length - 1];
  const lastMove = moving[moving.length - 1];
  const t1 = new Date(last.ts).getTime();
  const t0 = new Date(lastMove.ts).getTime();
  return Math.max(0, (t1 - t0)/1000);
}

function variance(arr){
  if (arr.length === 0) return 0;
  const m = arr.reduce((a,b)=>a+b,0)/arr.length;
  return arr.reduce((a,b)=>a + (b-m)*(b-m), 0)/arr.length;
}
