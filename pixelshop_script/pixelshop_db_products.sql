-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: pixelshop_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount` int NOT NULL,
  `description` text NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `ranking` int NOT NULL,
  `genres` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Doom',3600,10,'Qué onda gato si anda deaah','j1.jpg',8,'1,3,12','2022-07-09 10:31:44','2022-07-09 10:31:44'),(2,'Mortal Kombat 11',1199,22,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j4.jpg',5,'2,5','2022-07-09 10:31:44','2022-07-09 10:31:44'),(3,'Red dead redeption II',2499,30,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j5.jpg',2,'11,6','2022-07-09 10:31:44','2022-07-09 10:31:44'),(4,'God of War',4199,25,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j6.jpg',10,'4,7,8,9','2022-07-09 10:31:44','2022-07-09 10:31:44'),(5,'Dragon ball xenoverse XV',43999,22,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j7.jpg',10,'2','2022-07-09 10:31:44','2022-07-09 10:31:44'),(6,'The last of us',39999,15,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j8.jpg',7,'2,4,5','2022-07-09 10:31:44','2022-07-09 10:31:44'),(7,'Grand Theft Auto V',54188,20,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j9.jpg',9,'9,8,3','2022-07-09 10:31:44','2022-07-09 10:31:44'),(8,'Dragon ball fighters Z',3000,40,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j10.jpg',1,'5,6,2','2022-07-09 10:31:44','2022-07-09 10:31:44'),(9,'Call of Duty Black ops III',26008,10,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j11.jpg',8,'1,5','2022-07-09 10:31:44','2022-07-09 10:31:44'),(10,'Resident Evil 2',81999,22,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','j12.jpg',8,'9','2022-07-09 10:31:44','2022-07-09 10:31:44'),(11,'CyberPunk',2199,25,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','juego-muestra.jpg',3,'10,6','2022-07-09 10:31:44','2022-07-09 10:31:44'),(12,'Aura Kingdom',1500,40,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','oferta-1.jpg',5,'12,6,5','2022-07-09 10:31:44','2022-07-09 10:31:44'),(13,'Lost arks',2360,50,'Lorem ipsum dolor sit amet, consectetur adipisicing elit.','oferta-2.jpg',2,'5,2,3','2022-07-09 10:31:44','2022-07-09 10:31:44');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-09 18:15:47
