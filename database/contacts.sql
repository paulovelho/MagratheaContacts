
DROP TABLE IF EXISTS `mail`;

CREATE TABLE `mail` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`source_id` int(11) NULL,
	`origin_key` varchar(255) NULL,
	`email_from` varchar(255) NULL,
	`email_replyTo` varchar(255) NULL,
	`email_to` varchar(255) NULL,
	`msg_subject` varchar(255) NULL,
	`message` text DEFAULT NULL,
	`priority` int(11) NULL,
	`add_date` datetime NULL,
	`sent_date` datetime NULL,
	`sent_status` int(11) NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `source`;

CREATE TABLE `source` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(255) NULL,
	`mail_from` varchar(255) NULL,
	`smtp_id` int(11) NULL,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `apikey`;

CREATE TABLE `apikey` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`source_id` int(11) NULL,
	`description` varchar(255) NULL,
	`priority` int(11) NULL,
	`val` varchar(255) NULL,
	`uses` int(11) NULL,
	`usage_limit` int(11) NULL,
	`expiration` datetime NULL,
	`active` tinyint(1) NOT NULL DEFAULT 1,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `smtp`;

CREATE TABLE `smtp` (
	`id` int(11) PRIMARY KEY AUTO_INCREMENT,
	`description` varchar(255) NULL,
	`host` varchar(255) NULL,
	`port` varchar(8) NULL,
	`user` varchar(255) NULL,
	`password` varchar(255) NULL,
	`tls_encrypt` tinyint(1) NOT NULL DEFAULT 1,
	`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
