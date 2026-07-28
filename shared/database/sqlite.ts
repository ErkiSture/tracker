// import * as SQLite from "expo-sqlite";

// export const db = SQLite.openDatabaseSync('mood_tracker.db');

// export default function setUpDatabase() {
//   db.execSync(`
//     CREATE TABLE IF NOT EXISTS entries (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       mood INTEGER NOT NULL,
//       energy INTEGER NOT NULL,
//       productivity INTEGER NOT NULL,
//       comment TEXT,
//       created_at DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE
//     );
//   `);
// }


import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync('mood_tracker.db');

export default function setUpDatabase() {
  db.execSync(`PRAGMA foreign_keys = ON;`);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comment TEXT,
      created_at DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE
    );
    
    CREATE TABLE IF NOT EXISTS metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS entry_values (
      entry_id INTEGER NOT NULL,
      metric_id INTEGER NOT NULL,
      value INTEGER NOT NULL,

      PRIMARY KEY (entry_id, metric_id),

      FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
      FOREIGN KEY (metric_id) REFERENCES metrics(id) ON DELETE CASCADE
    );
  `);
}


