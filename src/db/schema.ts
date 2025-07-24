import { mysqlTable, serial, int, varchar, boolean, decimal} from 'drizzle-orm/mysql-core';

//食材
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

export const ingredientGroupColors = mysqlTable('ingredient_group_colors', {
  id: serial('id').primaryKey(),
  ingredientGroupId: int('ingredient_group_id').notNull(),
  colorCode: varchar('color_code', { length: 7 }).notNull(), 
});

//料理
export const dishes = mysqlTable('dishes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  timeMinutes: int('time_minutes'),
  energyKcal: int('energy_kcal'),
  isFavorite: boolean('is_favorite').default(false),
});

export const dishIngredients = mysqlTable("dish_ingredients", {
  id: serial("id").primaryKey(),
  dishId: int("dish_id").references(() => dishes.id),
  ingredientId: int("ingredient_id").references(() => ingredients.id),
  quantity: decimal("quantity", { precision: 10, scale: 2 }),
});

export const dishRecipes = mysqlTable("dish_recipes", {
  id: serial("id").primaryKey(),
  dishId: int("dish_id").references(() => dishes.id),
  stepNumber: int("step_number"),
  description: varchar("description", { length: 1000 }),
});

export const dishImages = mysqlTable("dish_images", {
  id: serial("id").primaryKey(),
  dishId: int("dish_id").references(() => dishes.id),
  imageUrl: varchar("image_url", { length: 1000 }),
});

