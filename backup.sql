-- MySQL dump 10.13  Distrib 8.0.41, for Linux (aarch64)
--
-- Host: localhost    Database: ecommerce_ceramic_cups
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ecommerce_ceramic_cups`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ecommerce_ceramic_cups` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `ecommerce_ceramic_cups`;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `address_name` enum('work','home','other') DEFAULT 'other',
  `created_at` timestamp NULL DEFAULT (now()),
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES ('0efd8b92-7354-4243-b64a-dfd86ac23abf','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:28:36','hoang anh','trumbien2001@gmail.com'),('10a5a71d-39d5-4550-bb7e-f8f0d1badc7a','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 11:28:38','hoang anh','trumbien2001@gmail.com'),('256afcd7-5e22-4379-84fb-7f802f39f60b','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:26:39','hoang anh','trumbien2001@gmail.com'),('4e824b0c-5d96-4f0e-90e8-276121433308','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:24:47','hoang anh','trumbien2001@gmail.com'),('4fab5abb-62c8-481a-a0c3-8726fbbe9cc9','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 11:26:08','hoang anh','trumbien2001@gmail.com'),('5143efc9-497b-4607-a988-ce03a5d5515f','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:35:58','hoang anh','trumbien2001@gmail.com'),('5574f650-16ac-4fa8-a417-d2386d0dc4e4','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 11:01:47','hoang anh','trumbien2001@gmail.com'),('76831c0e-db07-4db6-a853-cd25f1f79aaf','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:30:05','hoang anh','trumbien2001@gmail.com'),('7e403acd-2d83-47ca-b27f-ae231b979f0c','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,NULL,'ho chi minh','ho chi minh',NULL,'VN','1234567890',0,'other','2025-03-08 18:19:02','hoang anh','trumbien2001@gmail.com'),('9233aba5-a5da-471f-ba71-42145a189e9e','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,NULL,'ho chi minh','ho chi minh',NULL,'VN','1234567890',0,'other','2025-03-08 18:20:38','hoang anh','trumbien2001@gmail.com'),('94d20a18-53ea-4df1-b814-e53918661145','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 11:35:19','hoang anh','trumbien2001@gmail.com'),('9b0cb09a-5886-48c1-8d6a-0d587374b2e7','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:27:44','hoang anh','trumbien2001@gmail.com'),('a2019000-731d-4f3a-a374-7fac5b9c62b0','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 10:30:34','hoang anh','froyal2kk1@gmail.com'),('ae60fb46-8575-4924-a1e2-95872d719690','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 09:13:50','hoang anh','trumbien2001@gmail.com'),('b1d49c1e-71de-4952-9cdb-92c31aab0aa3','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:38:54','hoang anh','trumbien2001@gmail.com'),('b676f72f-3273-4782-aab0-2905616869f9','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 11:29:52','hoang anh','trumbien2001@gmail.com'),('bc024fff-577b-40e5-97fd-90baf85c36ab','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:34:04','hoang anh','trumbien2001@gmail.com'),('dd7e9fd9-027b-4a80-85c2-b616253a029f','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 09:20:15','hoang anh','trumbien2001@gmail.com'),('e9269be0-d8d2-48af-99e4-721e7844a4f8','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 09:45:21','hoang anh','trumbien2001@gmail.com'),('f00782fb-a9e6-4f4f-9c65-83577a6dc848','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,NULL,'ho chi minh','ho chi minh',NULL,'VN','1234567890',0,'other','2025-03-08 18:16:06','hoang anh','trumbien2001@gmail.com'),('f362b8e3-3362-47e9-962e-e227da2cebde','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 10:39:25','hoang anh','trumbien2001@gmail.com'),('f86a1515-0219-4239-8337-f7170e3afff9','d0a87ced-f78b-11ef-8f24-0242ac110002','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-08 18:32:44','hoang anh','trumbien2001@gmail.com'),('f8f789ba-1b10-4f14-ae97-54072c6b40f5','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 10:13:49','hoang anh','trumbien2001@gmail.com'),('ffc467a1-cb2a-4a59-b5bd-8961edc8338c','aaa05fcb-55ac-4237-8762-c50df4191646','123 main st','','ho chi minh','ho chi minh','12345','VN','1234567890',0,'home','2025-03-09 10:27:17','hoang anh','trumbien2001@gmail.com');
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartItems`
--

DROP TABLE IF EXISTS `CartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartItems` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `cart_id` char(36) DEFAULT NULL,
  `product_type_id` char(36) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `CartItems_ibfk_1` FOREIGN KEY (`product_type_id`) REFERENCES `ProductTypes` (`id`),
  CONSTRAINT `CartItems_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `Carts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartItems`
--

LOCK TABLES `CartItems` WRITE;
/*!40000 ALTER TABLE `CartItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `CartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carts`
--

DROP TABLE IF EXISTS `Carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carts` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `total_item` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carts`
--

LOCK TABLES `Carts` WRITE;
/*!40000 ALTER TABLE `Carts` DISABLE KEYS */;
INSERT INTO `Carts` VALUES ('2cf65397-2e8d-4316-8525-451b2074e463','aaa05fcb-55ac-4237-8762-c50df4191646',0,'2025-03-09 09:19:03'),('b2335b40-8ba8-4176-8942-d4ced0cadb08','d0a87ced-f78b-11ef-8f24-0242ac110002',0,'2025-03-05 06:06:48');
/*!40000 ALTER TABLE `Carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderItems`
--

DROP TABLE IF EXISTS `OrderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderItems` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `order_id` char(36) DEFAULT NULL,
  `product_type_id` char(36) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_type_id` (`product_type_id`),
  CONSTRAINT `OrderItems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
  CONSTRAINT `OrderItems_ibfk_2` FOREIGN KEY (`product_type_id`) REFERENCES `ProductTypes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderItems`
--

LOCK TABLES `OrderItems` WRITE;
/*!40000 ALTER TABLE `OrderItems` DISABLE KEYS */;
INSERT INTO `OrderItems` VALUES ('2144da1c-d84d-474c-a6ed-d112986beee3','3667aa88-5896-4984-8b3d-c974c59647fe','191c74d1-f978-11ef-8624-0242ac110002',1,18.99,'2025-03-09 09:45:21'),('2ebd4aa9-c6a4-4952-a931-aee0bced1e52','c1a31d3c-c0bc-4953-8e1a-557588f63e84','191c74d1-f978-11ef-8624-0242ac110002',1,18.99,'2025-03-09 10:27:17'),('3dcf98ee-07c7-49f8-a073-37db6650351c','294dea7d-c539-4140-9089-210210a0371a','46a2b6bb-f975-11ef-8624-0242ac110002',2,12.99,'2025-03-08 18:38:54'),('3de50d98-b3a8-491e-91e2-02bc98769a56','3667aa88-5896-4984-8b3d-c974c59647fe','191dc594-f978-11ef-8624-0242ac110002',1,12.99,'2025-03-09 09:45:21'),('4c26f901-6cb1-4245-b0bc-16c90532a4d2','bfb5a8e0-38a3-4821-be18-190564dcfbc9','191ddf73-f978-11ef-8624-0242ac110002',1,14.49,'2025-03-09 11:26:08'),('53d037ad-9bba-4b0a-854a-18590d1bf733','07551055-a9cf-4d7f-9fc5-8dc0e47eb073','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 11:35:19'),('605c570d-5907-4c0a-9836-5fb9f5dd28d8','f42b80fb-81f5-42ed-9cf3-0924a702931a','46a3312c-f975-11ef-8624-0242ac110002',1,19.99,'2025-03-09 11:29:52'),('6877bb03-f303-4df8-aa05-c3ef79395953','1fe047d6-c218-4c30-871f-bdec1c5547f4','46a30541-f975-11ef-8624-0242ac110002',1,22.99,'2025-03-09 10:13:49'),('6e42f8f5-99dc-4f13-bc6c-d4b5b116b96a','1cc960e3-2f34-40fa-a822-b0f9c6dc8c1d','46a1176e-f975-11ef-8624-0242ac110002',1,18.99,'2025-03-09 10:39:25'),('88eab99c-e915-4f02-95ba-be6a0d09c33c','1d7e25d0-a0e1-4c51-a394-d81c8cd8a98d','46a1176e-f975-11ef-8624-0242ac110002',1,18.99,'2025-03-09 09:13:50'),('95e56476-d0c8-4bf7-9bec-67fe61e3a495','c5f265a3-b3f0-48d3-b523-c0346b49af26','46a2b1b6-f975-11ef-8624-0242ac110002',1,16.49,'2025-03-09 11:01:47'),('a0c4786d-3075-4b42-af8b-7898b57381b1','294dea7d-c539-4140-9089-210210a0371a','46a30541-f975-11ef-8624-0242ac110002',1,22.99,'2025-03-08 18:38:54'),('a92c2e28-8f8a-4226-bf6d-eedde51673a1','bfb5a8e0-38a3-4821-be18-190564dcfbc9','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 11:26:08'),('b19bea9c-37c3-4976-be1b-1bf748c6f582','1fe047d6-c218-4c30-871f-bdec1c5547f4','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 10:13:49'),('b318bf7b-1f2d-4381-8c3d-a89da745d382','0765dd33-6228-42c0-a6cf-f352deaec2a4','46a30541-f975-11ef-8624-0242ac110002',1,22.99,'2025-03-09 09:20:15'),('c3315ea8-5c2e-41dd-ab3e-7ff5e6dd0385','76a58878-8927-4cf2-8614-afd5f4149da8','46a3180c-f975-11ef-8624-0242ac110002',1,15.99,'2025-03-09 10:30:34'),('d6451317-7d27-41e1-94de-cbd24e31bc37','294dea7d-c539-4140-9089-210210a0371a','46a2b1b6-f975-11ef-8624-0242ac110002',2,16.49,'2025-03-08 18:38:54'),('d648ddba-fc78-4414-a3b6-363d71764d14','581aaa1e-4fbf-48b1-8b3e-94de8344a318','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 11:28:38'),('e7b505bb-3ce3-4834-95c4-3ad2e03af0b7','294dea7d-c539-4140-9089-210210a0371a','46a3077c-f975-11ef-8624-0242ac110002',1,14.99,'2025-03-08 18:38:54'),('ed045bec-2134-4cf1-8e7f-eb98a6332890','0765dd33-6228-42c0-a6cf-f352deaec2a4','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 09:20:15'),('fec1b8c2-254d-47a8-9987-de19f0bdb37a','1d7e25d0-a0e1-4c51-a394-d81c8cd8a98d','46a2b6bb-f975-11ef-8624-0242ac110002',1,12.99,'2025-03-09 09:13:50');
/*!40000 ALTER TABLE `OrderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `payment_id` char(36) DEFAULT NULL,
  `status` enum('pending','completed','canceled') DEFAULT 'pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `delivery_address_id` char(36) DEFAULT NULL,
  `delivery_charge` decimal(10,2) DEFAULT '10.00',
  `order_note` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_id` (`payment_id`),
  KEY `delivery_address_id` (`delivery_address_id`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`id`),
  CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`delivery_address_id`) REFERENCES `Address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES ('07551055-a9cf-4d7f-9fc5-8dc0e47eb073','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',22.99,'2025-03-09 11:35:19','94d20a18-53ea-4df1-b814-e53918661145',10.00,'Happy to be here'),('0765dd33-6228-42c0-a6cf-f352deaec2a4','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',45.98,'2025-03-09 09:20:15','dd7e9fd9-027b-4a80-85c2-b616253a029f',10.00,'Happy to be here'),('1cc960e3-2f34-40fa-a822-b0f9c6dc8c1d','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',28.99,'2025-03-09 10:39:25','f362b8e3-3362-47e9-962e-e227da2cebde',10.00,'Happy to be here'),('1d7e25d0-a0e1-4c51-a394-d81c8cd8a98d','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',41.98,'2025-03-09 09:13:50','ae60fb46-8575-4924-a1e2-95872d719690',10.00,'Happy to be here'),('1fe047d6-c218-4c30-871f-bdec1c5547f4','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',45.98,'2025-03-09 10:13:49','f8f789ba-1b10-4f14-ae97-54072c6b40f5',10.00,'Happy to be here'),('294dea7d-c539-4140-9089-210210a0371a','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:38:54','b1d49c1e-71de-4952-9cdb-92c31aab0aa3',10.00,'Happy to be here'),('3667aa88-5896-4984-8b3d-c974c59647fe','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',41.98,'2025-03-09 09:45:21','e9269be0-d8d2-48af-99e4-721e7844a4f8',10.00,'Happy to be here'),('4d1275d0-d49a-445a-9f34-d9928a18d35f','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:32:53','f86a1515-0219-4239-8337-f7170e3afff9',10.00,'Happy to be here'),('581aaa1e-4fbf-48b1-8b3e-94de8344a318','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',22.99,'2025-03-09 11:28:38','10a5a71d-39d5-4550-bb7e-f8f0d1badc7a',10.00,'Happy to be here'),('613630a5-e6bc-43cc-b301-ae879aa45e26','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:30:05','76831c0e-db07-4db6-a853-cd25f1f79aaf',10.00,'Happy to be here'),('76a58878-8927-4cf2-8614-afd5f4149da8','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',25.99,'2025-03-09 10:30:34','a2019000-731d-4f3a-a374-7fac5b9c62b0',10.00,'Happy to be here'),('86e305be-3253-4413-9cd6-e1e4adbc0956','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:28:36','0efd8b92-7354-4243-b64a-dfd86ac23abf',10.00,'Happy to be here'),('bfb5a8e0-38a3-4821-be18-190564dcfbc9','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',37.48,'2025-03-09 11:26:08','4fab5abb-62c8-481a-a0c3-8726fbbe9cc9',10.00,'Happy to be here'),('c1a31d3c-c0bc-4953-8e1a-557588f63e84','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',28.99,'2025-03-09 10:27:17','ffc467a1-cb2a-4a59-b5bd-8961edc8338c',10.00,'Happy to be here'),('c5f265a3-b3f0-48d3-b523-c0346b49af26','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',26.49,'2025-03-09 11:01:47','5574f650-16ac-4fa8-a417-d2386d0dc4e4',10.00,'Happy to be here'),('e62381ce-2d7f-4471-b30b-09a3628a78b4','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:35:58','5143efc9-497b-4607-a988-ce03a5d5515f',10.00,'Happy to be here'),('f42b80fb-81f5-42ed-9cf3-0924a702931a','aaa05fcb-55ac-4237-8762-c50df4191646',NULL,'pending',29.99,'2025-03-09 11:29:52','b676f72f-3273-4782-aab0-2905616869f9',10.00,'Happy to be here'),('fbfce180-5671-4e0d-8990-4a8d532abfe1','d0a87ced-f78b-11ef-8f24-0242ac110002',NULL,'pending',106.94,'2025-03-08 18:34:04','bc024fff-577b-40e5-97fd-90baf85c36ab',10.00,'Happy to be here');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `payment_method` enum('credit_card','debit_card','bank_transfer','cash_on_delivery') NOT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `card_holder_name` varchar(255) DEFAULT NULL,
  `expiry_date` varchar(7) DEFAULT NULL,
  `payment_status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductTypes`
--

DROP TABLE IF EXISTS `ProductTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductTypes` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `product_id` char(36) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `ProductTypes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductTypes`
--

LOCK TABLES `ProductTypes` WRITE;
/*!40000 ALTER TABLE `ProductTypes` DISABLE KEYS */;
INSERT INTO `ProductTypes` VALUES ('01e054af-de8c-4004-8687-0b01f4c2898a','06bd1eaa-7072-46cc-9918-069496535517','a1','',1.00,11,'/uploads/file-1741543287218-645963798.jpg','2025-03-09 18:01:39'),('191c74d1-f978-11ef-8624-0242ac110002','3e1016e7-f927-11ef-8624-0242ac110002','Premium Edition','350ml high-end ceramic cup.',18.99,23,'assets/images/cup_demo_2.webp','2025-03-05 04:12:48'),('191dbd9f-f978-11ef-8624-0242ac110002','3e116b54-f927-11ef-8624-0242ac110002','Handcrafted','300ml artisan ceramic cup.',16.49,20,'assets/images/cup_demo_6.webp','2025-03-05 04:12:48'),('191dc594-f978-11ef-8624-0242ac110002','3e117069-f927-11ef-8624-0242ac110002','Eco-Friendly','250ml sustainable ceramic cup.',12.99,29,'assets/images/cup_demo_6.webp','2025-03-05 04:12:48'),('191dc9cc-f978-11ef-8624-0242ac110002','3e11744d-f927-11ef-8624-0242ac110002','Luxury Edition','400ml luxurious ceramic cup.',22.99,10,'assets/images/cup_demo_4.webp','2025-03-05 04:12:48'),('191dd664-f978-11ef-8624-0242ac110002','3e117524-f927-11ef-8624-0242ac110002','Vintage Style','280ml vintage-inspired ceramic cup.',14.99,15,'assets/images/cup_demo_8.webp','2025-03-05 04:12:48'),('191dda13-f978-11ef-8624-0242ac110002','3e117651-f927-11ef-8624-0242ac110002','Matte Black','300ml modern matte black ceramic cup.',15.99,18,'assets/images/cup_demo_9.webp','2025-03-05 04:12:48'),('191ddd1d-f978-11ef-8624-0242ac110002','3e1176f7-f927-11ef-8624-0242ac110002','Speckled Beige','260ml earthy speckled ceramic cup.',13.49,22,'assets/images/cup_demo_4.webp','2025-03-05 04:12:48'),('191ddf73-f978-11ef-8624-0242ac110002','3e117775-f927-11ef-8624-0242ac110002','Minimalist Blue','275ml minimalist blue ceramic cup.',14.49,16,'assets/images/cup_demo_3.webp','2025-03-05 04:12:48'),('191de097-f978-11ef-8624-0242ac110002','3e1177e8-f927-11ef-8624-0242ac110002','Classic Red','290ml vibrant red ceramic cup.',15.99,14,'assets/images/cup_demo_9.webp','2025-03-05 04:12:48'),('191de1a1-f978-11ef-8624-0242ac110002','3e117860-f927-11ef-8624-0242ac110002','Hand-Painted','320ml unique hand-painted ceramic cup.',19.99,12,'assets/images/cup_demo_7.webp','2025-03-05 04:12:48'),('191de2ab-f978-11ef-8624-0242ac110002','d0a8e2c4-f78b-11ef-8f24-0242ac110002','Rustic Handmade','300ml handcrafted rustic ceramic cup.',17.99,20,'assets/images/cup_demo_1.webp','2025-03-05 04:12:48'),('191de78f-f978-11ef-8624-0242ac110002','d0a8e458-f78b-11ef-8f24-0242ac110002','Luxury Gold Rim','350ml ceramic cup with gold accents.',23.99,10,'assets/images/cup_demo_2.webp','2025-03-05 04:12:48'),('46a1176e-f975-11ef-8624-0242ac110002','3e1016e7-f927-11ef-8624-0242ac110002','Premium Edition','350ml high-end ceramic cup.',18.99,23,'assets/images/cup_demo_8.webp','2025-03-05 03:52:36'),('46a2b1b6-f975-11ef-8624-0242ac110002','3e116b54-f927-11ef-8624-0242ac110002','Handcrafted','300ml artisan ceramic cup.',16.49,17,'assets/images/cup_demo_4.webp','2025-03-05 03:52:36'),('46a2b6bb-f975-11ef-8624-0242ac110002','3e117069-f927-11ef-8624-0242ac110002','Eco-Friendly','250ml sustainable ceramic cup.',12.99,22,'assets/images/cup_demo_5.webp','2025-03-05 03:52:36'),('46a30541-f975-11ef-8624-0242ac110002','3e11744d-f927-11ef-8624-0242ac110002','Luxury Edition','400ml luxurious ceramic cup.',22.99,7,'assets/images/cup_demo_4.webp','2025-03-05 03:52:36'),('46a3077c-f975-11ef-8624-0242ac110002','3e117524-f927-11ef-8624-0242ac110002','Vintage Style','280ml vintage-inspired ceramic cup.',14.99,14,'assets/images/cup_demo_3.webp','2025-03-05 03:52:36'),('46a3180c-f975-11ef-8624-0242ac110002','3e117651-f927-11ef-8624-0242ac110002','Matte Black','300ml modern matte black ceramic cup.',15.99,17,'assets/images/cup_demo_2.webp','2025-03-05 03:52:36'),('46a32304-f975-11ef-8624-0242ac110002','3e1176f7-f927-11ef-8624-0242ac110002','Speckled Beige','260ml earthy speckled ceramic cup.',13.49,22,'assets/images/cup_demo_9.webp','2025-03-05 03:52:36'),('46a32876-f975-11ef-8624-0242ac110002','3e117775-f927-11ef-8624-0242ac110002','Minimalist Blue','275ml minimalist blue ceramic cup.',14.49,17,'assets/images/cup_demo_6.webp','2025-03-05 03:52:36'),('46a32bd5-f975-11ef-8624-0242ac110002','3e1177e8-f927-11ef-8624-0242ac110002','Classic Red','290ml vibrant red ceramic cup.',15.99,14,'assets/images/cup_demo_8.webp','2025-03-05 03:52:36'),('46a3312c-f975-11ef-8624-0242ac110002','3e117860-f927-11ef-8624-0242ac110002','Hand-Painted','320ml unique hand-painted ceramic cup.',19.99,11,'assets/images/cup_demo_5.webp','2025-03-05 03:52:36'),('545e8b54-f978-11ef-8624-0242ac110002','46716c64-f978-11ef-8624-0242ac110002','Standard Size','250ml elegant silver-plated ceramic cup.',14.99,20,'assets/images/cup_demo_7.webp','2025-03-05 04:14:27'),('545ec3d5-f978-11ef-8624-0242ac110002','46716c64-f978-11ef-8624-0242ac110002','Large Size','350ml elegant silver-plated ceramic cup.',16.99,15,'assets/images/cup_demo_5.webp','2025-03-05 04:14:27'),('545ed2f4-f978-11ef-8624-0242ac110002','467241d0-f978-11ef-8624-0242ac110002','Patterned','300ml geometric pattern ceramic cup.',12.99,25,'assets/images/cup_demo_3.webp','2025-03-05 04:14:27'),('545ed81b-f978-11ef-8624-0242ac110002','467241d0-f978-11ef-8624-0242ac110002','Minimalist','250ml simple geometric ceramic cup.',10.99,30,'assets/images/cup_demo_6.webp','2025-03-05 04:14:27'),('545edcbd-f978-11ef-8624-0242ac110002','46724712-f978-11ef-8624-0242ac110002','Pastel Edition','250ml pastel pink ceramic cup.',9.99,40,'assets/images/cup_demo_4.webp','2025-03-05 04:14:27'),('545ee0cd-f978-11ef-8624-0242ac110002','46724712-f978-11ef-8624-0242ac110002','Cozy Large','350ml pastel pink ceramic cup.',11.99,35,'assets/images/cup_demo_4.webp','2025-03-05 04:14:27'),('545ee7ba-f978-11ef-8624-0242ac110002','467249c0-f978-11ef-8624-0242ac110002','Glossy Finish','300ml classic navy ceramic cup.',13.99,25,'assets/images/cup_demo_4.webp','2025-03-05 04:14:27'),('545eecf4-f978-11ef-8624-0242ac110002','467249c0-f978-11ef-8624-0242ac110002','Matte Finish','250ml classic navy ceramic cup.',11.99,30,'assets/images/cup_demo_7.webp','2025-03-05 04:14:27'),('545ef0c4-f978-11ef-8624-0242ac110002','46726020-f978-11ef-8624-0242ac110002','Sunset Edition','250ml sunset gradient ceramic cup.',14.99,20,'assets/images/cup_demo_6.webp','2025-03-05 04:14:27'),('545ef5df-f978-11ef-8624-0242ac110002','46726020-f978-11ef-8624-0242ac110002','Twilight Edition','350ml twilight gradient ceramic cup.',16.99,15,'assets/images/cup_demo_7.webp','2025-03-05 04:14:27'),('5ea2580b-f927-11ef-8624-0242ac110002','d0a8e2c4-f78b-11ef-8f24-0242ac110002','Standard Size','250ml elegant silver-plated ceramic cup.',14.99,20,'assets/images/cup_demo_7.webp','2025-03-04 18:34:55'),('5ea2ac4a-f927-11ef-8624-0242ac110002','d0a8e2c4-f78b-11ef-8f24-0242ac110002','Large Size','350ml elegant silver-plated ceramic cup.',16.99,15,'assets/images/cup_demo_4.webp','2025-03-04 18:34:55'),('5ea2b54b-f927-11ef-8624-0242ac110002','d0a8e458-f78b-11ef-8f24-0242ac110002','Patterned','300ml geometric pattern ceramic cup.',12.99,25,'assets/images/cup_demo_1.webp','2025-03-04 18:34:55'),('5ea2ba2b-f927-11ef-8624-0242ac110002','d0a8e458-f78b-11ef-8f24-0242ac110002','Minimalist','250ml simple geometric ceramic cup.',10.99,30,'assets/images/cup_demo_2.webp','2025-03-04 18:34:55'),('5ea2bf00-f927-11ef-8624-0242ac110002','d0a8e513-f78b-11ef-8f24-0242ac110002','Pastel Edition','250ml pastel pink ceramic cup.',9.99,40,'assets/images/cup_demo_7.webp','2025-03-04 18:34:55'),('5ea2c445-f927-11ef-8624-0242ac110002','d0a8e513-f78b-11ef-8f24-0242ac110002','Cozy Large','350ml pastel pink ceramic cup.',11.99,35,'assets/images/cup_demo_1.webp','2025-03-04 18:34:55'),('5ea2c9f0-f927-11ef-8624-0242ac110002','d0a8e544-f78b-11ef-8f24-0242ac110002','Glossy Finish','300ml classic navy ceramic cup.',13.99,25,'assets/images/cup_demo_2.webp','2025-03-04 18:34:55'),('5ea2ce8e-f927-11ef-8624-0242ac110002','d0a8e544-f78b-11ef-8f24-0242ac110002','Matte Finish','250ml classic navy ceramic cup.',11.99,30,'assets/images/cup_demo_6.webp','2025-03-04 18:34:55'),('5ea2d7e1-f927-11ef-8624-0242ac110002','d0a8e56a-f78b-11ef-8f24-0242ac110002','Sunset Edition','250ml sunset gradient ceramic cup.',14.99,20,'assets/images/cup_demo_6.webp','2025-03-04 18:34:55'),('5ea2dfa6-f927-11ef-8624-0242ac110002','d0a8e56a-f78b-11ef-8f24-0242ac110002','Twilight Edition','350ml twilight gradient ceramic cup.',16.99,15,'assets/images/cup_demo_3.webp','2025-03-04 18:34:55'),('70308e83-f978-11ef-8624-0242ac110002','46726103-f978-11ef-8624-0242ac110002','Standard Size','250ml elegant silver-plated ceramic cup.',14.99,20,'assets/images/cup_demo_5.webp','2025-03-05 04:15:14'),('7030cc98-f978-11ef-8624-0242ac110002','46726103-f978-11ef-8624-0242ac110002','Large Size','350ml elegant silver-plated ceramic cup.',16.99,15,'assets/images/cup_demo_5.webp','2025-03-05 04:15:14'),('7030d0af-f978-11ef-8624-0242ac110002','46726180-f978-11ef-8624-0242ac110002','Patterned','300ml geometric pattern ceramic cup.',12.99,25,'assets/images/cup_demo_3.webp','2025-03-05 04:15:14'),('7030d474-f978-11ef-8624-0242ac110002','46726180-f978-11ef-8624-0242ac110002','Minimalist','250ml simple geometric ceramic cup.',10.99,30,'assets/images/cup_demo_8.webp','2025-03-05 04:15:14'),('7030dcc8-f978-11ef-8624-0242ac110002','467261fc-f978-11ef-8624-0242ac110002','Pastel Edition','250ml pastel pink ceramic cup.',9.99,40,'assets/images/cup_demo_4.webp','2025-03-05 04:15:14'),('7030e03e-f978-11ef-8624-0242ac110002','467261fc-f978-11ef-8624-0242ac110002','Cozy Large','350ml pastel pink ceramic cup.',11.99,35,'assets/images/cup_demo_6.webp','2025-03-05 04:15:14'),('7030e2d3-f978-11ef-8624-0242ac110002','4672637e-f978-11ef-8624-0242ac110002','Glossy Finish','300ml classic navy ceramic cup.',13.99,25,'assets/images/cup_demo_6.webp','2025-03-05 04:15:14'),('7030ef16-f978-11ef-8624-0242ac110002','4672637e-f978-11ef-8624-0242ac110002','Matte Finish','250ml classic navy ceramic cup.',11.99,30,'assets/images/cup_demo_2.webp','2025-03-05 04:15:14'),('7030f429-f978-11ef-8624-0242ac110002','4672641e-f978-11ef-8624-0242ac110002','Sunset Edition','250ml sunset gradient ceramic cup.',14.99,20,'assets/images/cup_demo_3.webp','2025-03-05 04:15:14'),('7030f96d-f978-11ef-8624-0242ac110002','4672641e-f978-11ef-8624-0242ac110002','Twilight Edition','350ml twilight gradient ceramic cup.',16.99,15,'assets/images/cup_demo_6.webp','2025-03-05 04:15:14'),('d0ab3674-f78b-11ef-8f24-0242ac110002','d0a8e2c4-f78b-11ef-8f24-0242ac110002','Standard Size','250ml classic white ceramic cup.',10.99,50,'assets/images/cup_demo_3.webp','2025-03-02 17:28:54'),('d0ab3966-f78b-11ef-8f24-0242ac110002','d0a8e2c4-f78b-11ef-8f24-0242ac110002','Large Size','350ml classic white ceramic cup.',12.99,30,'assets/images/cup_demo_4.webp','2025-03-02 17:28:54'),('d0ab3a91-f78b-11ef-8f24-0242ac110002','d0a8e458-f78b-11ef-8f24-0242ac110002','Small Size','200ml vintage floral ceramic cup.',9.99,40,'assets/images/cup_demo_2.webp','2025-03-02 17:28:54'),('d0ab3bb1-f78b-11ef-8f24-0242ac110002','d0a8e458-f78b-11ef-8f24-0242ac110002','Standard Size','300ml vintage floral ceramic cup.',11.99,35,'assets/images/cup_demo_8.webp','2025-03-02 17:28:54');
/*!40000 ALTER TABLE `ProductTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES ('06bd1eaa-7072-46cc-9918-069496535517','a','a',0,'2025-03-09 18:01:39'),('3e1016e7-f927-11ef-8624-0242ac110002','Elegant Silver Cup','A stylish silver-plated ceramic cup for a touch of luxury.',0,'2025-03-04 18:34:01'),('3e116b54-f927-11ef-8624-0242ac110002','Modern Geometric Cup','A contemporary cup with geometric patterns.',0,'2025-03-04 18:34:01'),('3e117069-f927-11ef-8624-0242ac110002','Pastel Pink Cup','A soft pastel pink ceramic cup for a cozy feel.',0,'2025-03-04 18:34:01'),('3e11744d-f927-11ef-8624-0242ac110002','Classic Navy Cup','A deep navy blue ceramic cup with a glossy finish.',0,'2025-03-04 18:34:01'),('3e117524-f927-11ef-8624-0242ac110002','Sunset Gradient Cup','A beautiful gradient cup resembling a sunset.',0,'2025-03-04 18:34:01'),('3e117651-f927-11ef-8624-0242ac110002','Textured Stone Cup','A cup with a stone-like texture for a rustic feel.',0,'2025-03-04 18:34:01'),('3e1176f7-f927-11ef-8624-0242ac110002','Nordic Style Cup','A minimalist Nordic-inspired ceramic cup.',0,'2025-03-04 18:34:01'),('3e117775-f927-11ef-8624-0242ac110002','Crystal Clear Glass Cup','A transparent glass cup for a sleek look.',0,'2025-03-04 18:34:01'),('3e1177e8-f927-11ef-8624-0242ac110002','Cottagecore Floral Cup','A cute floral cup perfect for cottagecore aesthetics.',0,'2025-03-04 18:34:01'),('3e117860-f927-11ef-8624-0242ac110002','Hand-Painted Artistic Cup','A hand-painted ceramic cup with unique designs.',0,'2025-03-04 18:34:01'),('46716c64-f978-11ef-8624-0242ac110002','Elegant Silver Cup','A stylish silver-plated ceramic cup for a touch of luxury.',0,'2025-03-05 04:14:04'),('467241d0-f978-11ef-8624-0242ac110002','Modern Geometric Cup','A contemporary cup with geometric patterns.',0,'2025-03-05 04:14:04'),('46724712-f978-11ef-8624-0242ac110002','Pastel Pink Cup','A soft pastel pink ceramic cup for a cozy feel.',0,'2025-03-05 04:14:04'),('467249c0-f978-11ef-8624-0242ac110002','Classic Navy Cup','A deep navy blue ceramic cup with a glossy finish.',0,'2025-03-05 04:14:04'),('46726020-f978-11ef-8624-0242ac110002','Sunset Gradient Cup','A beautiful gradient cup resembling a sunset.',0,'2025-03-05 04:14:04'),('46726103-f978-11ef-8624-0242ac110002','Textured Stone Cup','A cup with a stone-like texture for a rustic feel.',0,'2025-03-05 04:14:04'),('46726180-f978-11ef-8624-0242ac110002','Nordic Style Cup','A minimalist Nordic-inspired ceramic cup.',0,'2025-03-05 04:14:04'),('467261fc-f978-11ef-8624-0242ac110002','Crystal Clear Glass Cup','A transparent glass cup for a sleek look.',0,'2025-03-05 04:14:04'),('4672637e-f978-11ef-8624-0242ac110002','Cottagecore Floral Cup','A cute floral cup perfect for cottagecore aesthetics.',0,'2025-03-05 04:14:04'),('4672641e-f978-11ef-8624-0242ac110002','Hand-Painted Artistic Cup','A hand-painted ceramic cup with unique designs.',0,'2025-03-05 04:14:04'),('467275a2-f978-11ef-8624-0242ac110002','Classic White Porcelain Cup','A timeless and elegant choice, perfect for coffee or tea lovers.',0,'2025-03-05 04:14:04'),('467276ae-f978-11ef-8624-0242ac110002','Speckled Handmade Ceramic Mug','Features a rustic, handcrafted look with a speckled glaze finish.',0,'2025-03-05 04:14:04'),('4672ae32-f978-11ef-8624-0242ac110002','Matte Black Minimalist Mug','A modern and sleek design, great for a contemporary aesthetic.',0,'2025-03-05 04:14:04'),('4672b7ce-f978-11ef-8624-0242ac110002','Japanese-Style Stoneware Cup','Often featuring earthy tones and textured surfaces, inspired by traditional Japanese pottery.',0,'2025-03-05 04:14:04'),('4672babb-f978-11ef-8624-0242ac110002','Glazed Gradient Mug','A cup with a color gradient effect, creating a unique artistic vibe.',0,'2025-03-05 04:14:04'),('4672bb63-f978-11ef-8624-0242ac110002','Textured Geometric Ceramic Cup','Features embossed or carved geometric patterns for a stylish touch.',0,'2025-03-05 04:14:04'),('4672e070-f978-11ef-8624-0242ac110002','Double-Walled Ceramic Espresso Cup','Keeps your espresso hot while being comfortable to hold.',0,'2025-03-05 04:14:04'),('4672e1ca-f978-11ef-8624-0242ac110002','Large Hand-Painted Ceramic Mug','A bold and colorful option, often with floral or artistic designs.',0,'2025-03-05 04:14:04'),('4672e26d-f978-11ef-8624-0242ac110002','Personalized Engraved Ceramic Cup','Customizable with names, quotes, or initials for a personal touch.',0,'2025-03-05 04:14:04'),('4672e378-f978-11ef-8624-0242ac110002','Travel-Friendly Ceramic Cup with Lid','A sustainable alternative to disposable cups, often featuring a silicone lid and sleeve.',0,'2025-03-05 04:14:04'),('d0a8e2c4-f78b-11ef-8f24-0242ac110002','Elegant White Cup','A classic white ceramic cup perfect for coffee or tea.',0,'2025-03-02 17:28:54'),('d0a8e458-f78b-11ef-8f24-0242ac110002','Vintage Floral Cup','A beautifully designed floral ceramic cup for tea lovers.',0,'2025-03-02 17:28:54'),('d0a8e513-f78b-11ef-8f24-0242ac110002','Matte Black Cup','A sleek matte black ceramic cup for modern aesthetics.',0,'2025-03-02 17:28:54'),('d0a8e544-f78b-11ef-8f24-0242ac110002','Rustic Handmade Cup','A handcrafted rustic ceramic cup with a unique texture.',0,'2025-03-02 17:28:54'),('d0a8e56a-f78b-11ef-8f24-0242ac110002','Minimalist Blue Cup','A simple yet elegant blue ceramic cup.',0,'2025-03-02 17:28:54'),('d0a8e58e-f78b-11ef-8f24-0242ac110002','Glazed Green Cup','A green ceramic cup with a glossy finish.',0,'2025-03-02 17:28:54'),('d0a8e5ae-f78b-11ef-8f24-0242ac110002','Speckled Beige Cup','A speckled beige ceramic cup for an earthy look.',0,'2025-03-02 17:28:54'),('d0a8e5d3-f78b-11ef-8f24-0242ac110002','Classic Red Cup','A vibrant red ceramic cup perfect for any setting.',0,'2025-03-02 17:28:54'),('d0a8e628-f78b-11ef-8f24-0242ac110002','Luxury Gold Rim Cup','A high-end ceramic cup with a gold rim.',0,'2025-03-02 17:28:54'),('d0a8e66f-f78b-11ef-8f24-0242ac110002','Japanese Style Cup','A traditional Japanese-style ceramic cup.',0,'2025-03-02 17:28:54');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('45bc0045-f7a3-11ef-b0f4-0242ac110002','Admin Seller 2','admin2@example.com','$2a$12$eocRcg/LjH6AHQeigb.l2u3hjRjQ9L3aeRJGYF1OSFbG6OSDHWKLa','refresh_token',1,'2025-03-02 20:16:49'),('aaa05fcb-55ac-4237-8762-c50df4191646','John Doe','froyal2kk1@gmail.com','$2b$12$Kvcza7ZM2iYgs7C1Ivz5pedv01lTG3vyX7cePXTaaP4gDYWa9BSKu','$2b$10$W3SyYp09m.p2ITQ0vUhzyu1SiJqN7R9C2rT6wKL8KN2r.Q5qu8Y0m',0,'2025-03-09 09:18:06'),('aaf7f7e9-20dd-46e5-aa16-4969fa622bc3','John Doe','user@example.com','$2b$12$IByU0QJEgPWaA3vtxJu6CeCBfErzFLFQijSk4y.EkfeHebe/SGeJy','$2b$10$BM1yssKawz.5Tv03TkXJxOQk6pmpbVYlC6fR0h.3.BfDyyIe1bRSG',0,'2025-03-06 06:22:26'),('d0a87ced-f78b-11ef-8f24-0242ac110002','Admin Seller','admin@example.com','$2a$12$eocRcg/LjH6AHQeigb.l2u3hjRjQ9L3aeRJGYF1OSFbG6OSDHWKLa','$2b$10$gdLxG9Y5Yv4MgLlg4u4ZkO9U6AlReoDjcmqqcZFBayaEDwzJk.M2G',1,'2025-03-02 17:28:54');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-10  7:09:42
