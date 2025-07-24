import {
  mysqlTable,
  int,
  varchar,
  boolean,
  decimal,
  foreignKey,
} from "drizzle-orm/mysql-core";

//食材
export const ingredients = mysqlTable("ingredients", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ingredientGroupId: int("ingredient_group_id")
    .notNull()
    .references(() => ingredientGroups.id),
  unitId: int("unit_id")
    .notNull()
    .references(() => units.id),
  pricePerUnit: int("price_per_unit"),
});

export const units = mysqlTable("units", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amountPerUnit: int("amount_per_unit"),
});

export const ingredientGroups = mysqlTable("ingredient_groups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const ingredientGroupColors = mysqlTable(
  "ingredient_group_colors",
  {
    id: int("id").autoincrement().primaryKey(),
    ingredientGroupId: int("ingredient_group_id").notNull(),
    colorCode: varchar("color_code", { length: 7 }).notNull(),
  },
  (table) => ({
    fkGroupColorToGroup: foreignKey({
      columns: [table.ingredientGroupId],
      foreignColumns: [ingredientGroups.id],
      name: "fk_group_color_to_group",
    }),
  })
);

//料理
export const dishes = mysqlTable("dishes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  timeMinutes: int("time_minutes").notNull(),
  // energyKcal: int("energy_kcal").notNull(),
  servings: int("servings").notNull(),
  isFavorite: boolean("is_favorite").default(false),
  imageUrl: varchar("image_url", { length: 1000 }),
});

export const dishIngredients = mysqlTable("dish_ingredients", {
  id: int("id").autoincrement().primaryKey(),
  dishId: int("dish_id")
    .notNull()
    .references(() => dishes.id),
  ingredientId: int("ingredient_id")
    .notNull()
    .references(() => ingredients.id),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
});

export const dishRecipes = mysqlTable("dish_recipes", {
  id: int("id").autoincrement().primaryKey(),
  dishId: int("dish_id")
    .notNull()
    .references(() => dishes.id),
  stepNumber: int("step_number").notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
});
