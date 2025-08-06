CREATE TABLE `dish_ingredients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dish_id` int unsigned NOT NULL,
	`ingredient_id` int unsigned NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	CONSTRAINT `dish_ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dish_recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dish_id` int unsigned NOT NULL,
	`step_number` int NOT NULL,
	`description` varchar(1000) NOT NULL,
	CONSTRAINT `dish_recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dishes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`time_minutes` int NOT NULL,
	`energy_kcal` int NOT NULL,
	`servings` int NOT NULL,
	`is_favorite` boolean DEFAULT false,
	`image_url` varchar(1000),
	CONSTRAINT `dishes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ingredient_group_colors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`ingredient_group_id` int unsigned NOT NULL,
	`color_code` varchar(7) NOT NULL,
	CONSTRAINT `ingredient_group_colors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ingredient_groups` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `ingredient_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`ingredient_group_id` int unsigned NOT NULL,
	`unit_id` int unsigned NOT NULL,
	`price_per_unit` int,
	CONSTRAINT `ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`amount_per_unit` int,
	CONSTRAINT `units_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_recipes` ADD CONSTRAINT `dish_recipes_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ingredient_group_colors` ADD CONSTRAINT `ingredient_group_colors_ingredient_group_id_ingredients_id_fk` FOREIGN KEY (`ingredient_group_id`) REFERENCES `ingredients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_ingredient_group_id_ingredient_groups_id_fk` FOREIGN KEY (`ingredient_group_id`) REFERENCES `ingredient_groups`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ingredients` ADD CONSTRAINT `ingredients_unit_id_units_id_fk` FOREIGN KEY (`unit_id`) REFERENCES `units`(`id`) ON DELETE no action ON UPDATE no action;