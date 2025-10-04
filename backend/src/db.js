import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const db = new Database(join(__dirname, '../trailsafe.db'));

export function migrate() {
  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
  db.exec(sql);
}

export function reset() {
  db.exec(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS hikes;
    DROP TABLE IF EXISTS waypoints;
    DROP TABLE IF EXISTS checkins;
    DROP TABLE IF EXISTS anomalies;
    DROP TABLE IF EXISTS contacts;
  `);
  migrate();
  console.log('Database reset');
}

migrate();

export { db, nanoid };
