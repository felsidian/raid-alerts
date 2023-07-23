CREATE TABLE `areas` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`alert` integer DEFAULT 0 NOT NULL,
	`updated` text DEFAULT '1970-01-01T00:00:00.000Z' NOT NULL
);
