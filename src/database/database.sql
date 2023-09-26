
CREATE TABLE `apikey` (
	`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `source_id` bigint(20) NOT NULL,
  `priority` int(11) NOT NULL,
  `val` varchar(255) NOT NULL,
  `uses` bigint(20) NOT NULL DEFAULT 0,
  `usage_limit` bigint(20) DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `mail` (
	`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `source_id` int(11) DEFAULT NULL,
  `origin_key` varchar(255) NOT NULL,
  `email_from` varchar(255) DEFAULT NULL,
  `email_replyTo` varchar(255) DEFAULT NULL,
  `email_to` varchar(255) DEFAULT NULL,
  `msg_subject` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `add_date` datetime DEFAULT NULL,
  `sent_date` datetime DEFAULT NULL,
  `sent_status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `source` (
	`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mail_from` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
