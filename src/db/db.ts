import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { areasState } from '../area-state.js';
import { areasTable } from './schema.js';

const db = drizzle(new Database('raid-alerts.db'));

migrate(db, { migrationsFolder: 'drizzle' });

db.insert(areasTable)
  .values(
    Object.entries(areasState).map((entry) => {
      return { id: entry[0], ...entry[1] };
    }),
  )
  .onConflictDoNothing()
  .run();

const result = db.select().from(areasTable).all();

console.log(result);
