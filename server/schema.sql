CREATE DATABASE chat;

USE chat;



DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `text` VARCHAR(500) NULL DEFAULT NULL,
  `createdAt` VARCHAR(50) NULL DEFAULT NULL,
  `roomname` VARCHAR(30) NULL DEFAULT NULL,
  `username` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

