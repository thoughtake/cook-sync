import { mysqlTable, serial, int, varchar,} from 'drizzle-orm/mysql-core';

export const ingredients = mysqlTable('ingredients', {
  id: serial('id').primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
  ingredientGroupId: int('ingredient_group_id').notNull(),
  unitId: int('unit_id').notNull(),
  pricePerUnit: int('price_per_unit'), 
});

export const units = mysqlTable('units', {
  id: serial('id').primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
  amountPerUnit: int('amount_per_unit'),
});

export const ingredientGroups = mysqlTable('ingredient_groups', {
  id: serial('id').primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
});