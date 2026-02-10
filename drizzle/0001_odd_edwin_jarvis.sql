CREATE TABLE `blog_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`featuredImage` varchar(512),
	`status` enum('draft','published','scheduled') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`scheduledFor` timestamp,
	`authorId` int NOT NULL,
	`category` varchar(100),
	`tags` varchar(500),
	`seoTitle` varchar(255),
	`seoDescription` varchar(500),
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `blog_articles` ADD CONSTRAINT `blog_articles_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;