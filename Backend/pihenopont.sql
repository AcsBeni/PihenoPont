-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 15. 12:17
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pihenopont`
--

-- --------------------------------------------------------

--
-- Nézet szerkezete `bookingfull`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bookingfull`  AS SELECT `b`.`id` AS `id`, `u`.`email` AS `email`, `a`.`name` AS `accommodation`, `b`.`startDate` AS `startDate`, `b`.`endDate` AS `endDate`, `b`.`persons` AS `persons`, `b`.`totalPrice` AS `Totalprice`, `b`.`status` AS `status`, `b`.`createdAt` AS `createdAt` FROM ((`bookings` `b` join `accommodations` `a` on(`a`.`id` = `b`.`accommodationId`)) join `users` `u` on(`u`.`id` = `b`.`userId`)) ;

--
-- VIEW `bookingfull`
-- Adatok: Nincs
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
