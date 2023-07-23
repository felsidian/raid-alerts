import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { areasState } from '../area-state.js';
import { Area, areasTable } from './schema.js';

const db = drizzle(new Database('raid-alerts.db'));

migrate(db, { migrationsFolder: 'drizzle' });

db.insert(areasTable)
  .values(
    areasState.map((areaState, i) => {
      return { id: i, ...areaState };
    }),
  )
  .onConflictDoNothing()
  .run();

const r = db
  .select({
    name: areasTable.name,
    alert: areasTable.alert,
    updated: areasTable.updated,
  })
  .from(areasTable)
  .all();

areasState.splice(0, areasState.length, ...r);
console.log(areasState);

export function updateArea(area: Area) {
  db.update(areasTable).set(area).where(eq(areasTable.id, area.id)).run();
}
