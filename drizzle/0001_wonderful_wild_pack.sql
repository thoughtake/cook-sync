CREATE TABLE `pantries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ingredient_id` int NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	CONSTRAINT `pantries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` RENAME COLUMN `color_code` TO `bg_color_code`;--> statement-breakpoint
ALTER TABLE `dish_ingredients` DROP FOREIGN KEY `dish_ingredients_dish_id_dishes_id_fk`;
--> statement-breakpoint
ALTER TABLE `dish_recipes` DROP FOREIGN KEY `dish_recipes_dish_id_dishes_id_fk`;
--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` DROP FOREIGN KEY `ingredient_group_colors_ingredient_group_id_ingredients_id_fk`;
--> statement-breakpoint
ALTER TABLE `dish_ingredients` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `dish_ingredients` MODIFY COLUMN `dish_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `dish_ingredients` MODIFY COLUMN `ingredient_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `dish_recipes` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `dish_recipes` MODIFY COLUMN `dish_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `dishes` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `dishes` MODIFY COLUMN `is_favorite` boolean NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` MODIFY COLUMN `ingredient_group_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredient_groups` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `ingredient_group_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `unit_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `price_per_unit` int NOT NULL;--> statement-breakpoint
ALTER TABLE `units` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `units` MODIFY COLUMN `amount_per_unit` int NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` ADD `text_color_code` varchar(7) NOT NULL;--> statement-breakpoint
ALTER TABLE `pantries` ADD CONSTRAINT `pantries_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_recipes` ADD CONSTRAINT `dish_recipes_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` ADD CONSTRAINT `fk_group_color_to_group` FOREIGN KEY (`ingredient_group_id`) REFERENCES `ingredient_groups`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dishes` DROP COLUMN `energy_kcal`;