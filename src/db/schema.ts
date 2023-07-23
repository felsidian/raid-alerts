import { InferModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const areasTable = sqliteTable('areas', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  alert: int('alert').notNull().default(0),
  updated: text('updated').notNull().default('1970-01-01T00:00:00.000Z'),
});

export type Area = InferModel<typeof areasTable>;
