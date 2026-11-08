-- Migration 2.5 — Templates feature
-- Adds `templates` and `mail_promises` tables for legacy installs.
-- Idempotent: safe to run more than once (CREATE TABLE IF NOT EXISTS, no DROP).
-- Fresh installs get these tables from contacts.sql.

CREATE TABLE IF NOT EXISTS `templates` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(255) NULL,
	`source_id` int(11) NULL,
	`description` varchar(255) NULL,
	`msg_subject` varchar(255) NULL,
	`content` text NULL,
	`vars` text NULL,
	`active` tinyint(1) NOT NULL DEFAULT 1,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `mail_promises` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`source_id` int(11) NULL,
	`origin_key` varchar(255) NULL,
	`mail_type` varchar(255) NULL,
	`email_from` varchar(255) NULL,
	`email_replyTo` varchar(255) NULL,
	`email_to` varchar(255) NULL,
	`msg_subject` varchar(255) NULL,
	`message` text NULL,
	`priority` int(11) NULL,
	`vars` text NULL,
	`template_id` int(11) NULL,
	`mail_id` int(11) NULL,
	`processed` tinyint(1) NOT NULL DEFAULT 0,
	`processed_date` datetime NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
