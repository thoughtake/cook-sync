CREATE TABLE `dish_images` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dish_id` int,
	`image_url` varchar(1000),
	CONSTRAINT `dish_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dish_ingredients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dish_id` int,
	`ingredient_id` int,
	`quantity` decimal(10,2),
	CONSTRAINT `dish_ingredients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dish_recipes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`dish_id` int,
	`step_number` int,
	`description` varchar(1000),
	CONSTRAINT `dish_recipes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dishes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`time_minutes` int,
	`energy_kcal` int,
	`is_favorite` boolean DEFAULT false,
	CONSTRAINT `dishes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ingredient_group_colors` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`ingredient_group_id` int NOT NULL,
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
	`ingredient_group_id` int NOT NULL,
	`unit_id` int NOT NULL,
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
ALTER TABLE `dish_images` ADD CONSTRAINT `dish_images_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_ingredients` ADD CONSTRAINT `dish_ingredients_ingredient_id_ingredients_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `dish_recipes` ADD CONSTRAINT `dish_recipes_dish_id_dishes_id_fk` FOREIGN KEY (`dish_id`) REFERENCES `dishes`(`id`) ON DELETE no action ON UPDATE no action;