import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync('mood_tracker.db');

export default function setUpDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood INTEGER,
      energy INTEGER,
      productivity INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}