-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 07. 08:29
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
-- Tábla szerkezet ehhez a táblához `accommodations`
--

CREATE TABLE `accommodations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(500) NOT NULL,
  `capacity` int(11) NOT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accommodations`
--

INSERT INTO `accommodations` (`id`, `name`, `description`, `address`, `capacity`, `basePrice`, `active`, `createdAt`) VALUES
(1, 'Grand Hall Budapest', 'A modern event hall suitable for conferences and weddings.', 'Budapest, Andrássy út 12.', 500, 2500.00, 1, '2025-12-15 07:59:39'),
(2, 'Riverside Conference Center', 'Conference center with a panoramic river view.', 'Budapest, Duna sétány 5.', 300, 1800.00, 1, '2025-12-15 07:59:39'),
(4, 'City Expo Hall', 'Large expo hall for exhibitions and trade shows.', 'Debrecen, Vásár utca 10.', 1200, 4200.00, 1, '2025-12-15 07:59:39'),
(5, 'Grand Hall', 'Updated description', 'New Address 12', 200, 199.99, 1, '2025-12-15 07:59:39'),
(7, 'Royal Ballroom', 'Elegant ballroom for luxury events and galas.', 'Budapest, Király utca 20.', 600, 3800.00, 1, '2025-12-15 07:59:39'),
(8, 'Community Cultural Center', 'Affordable venue for community and cultural events.', 'Szeged, Kossuth Lajos sugárút 15.', 250, 800.00, 1, '2025-12-15 07:59:39'),
(9, 'Industrial Loft Space', 'Minimalist industrial-style loft for creative events.', 'Budapest, Soroksári út 45.', 180, 1300.00, 0, '2025-12-15 07:59:39'),
(15, 'gagag', 'gagaga', 'agaga', 32, 12.00, 0, '2026-01-07 07:23:55');

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `accommodation_admin`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `accommodation_admin` (
`id` int(11)
,`name` varchar(255)
,`description` text
,`address` varchar(500)
,`capacity` int(11)
,`basePrice` decimal(10,2)
,`active` tinyint(1)
,`createdAt` timestamp
,`imagePath` varchar(500)
);

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `accommodation_guest`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `accommodation_guest` (
`id` int(11)
,`name` varchar(255)
,`description` text
,`address` varchar(500)
,`capacity` int(11)
,`basePrice` decimal(10,2)
,`active` tinyint(1)
,`createdAt` timestamp
,`accimgId` int(11)
,`imagePath` varchar(500)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accommodation_images`
--

CREATE TABLE `accommodation_images` (
  `id` int(11) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `imagePath` varchar(500) NOT NULL DEFAULT 'noimg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `accommodation_images`
--

INSERT INTO `accommodation_images` (`id`, `accommodationId`, `imagePath`) VALUES
(1, 2, '/uploads/image-1767683763917-988809378.jpg'),
(2, 1, '/uploads/image-1767683886952-474973048.jpg'),
(3, 4, '/uploads/image-1767688608067-538268906.jpg'),
(4, 5, '/uploads/image-1767683906440-658355784.jpg'),
(5, 7, '/uploads/image-1767683910999-482967329.jpg'),
(6, 8, '/uploads/image-1767683918344-365325994.jpg'),
(7, 9, '/uploads/image-1767683923248-778799758.jpg'),
(8, 4, '/uploads/image-1767688608067-538268906.jpg'),
(16, 15, '/uploads/image-1767770778186-932929076.jpg');

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `bookingfull`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `bookingfull` (
`id` int(11)
,`accommodationId` int(11)
,`userId` int(11)
,`email` varchar(255)
,`accommodation` varchar(255)
,`startDate` date
,`endDate` date
,`persons` int(11)
,`totalPrice` int(11)
,`status` enum('pending','confirmed','cancelled')
,`createdAt` timestamp
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `persons` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `accommodationId`, `startDate`, `endDate`, `persons`, `totalPrice`, `status`, `createdAt`) VALUES
(6, 11, 2, '2025-12-20', '2025-12-25', 4, 5000, 'cancelled', '2025-12-16 09:54:33'),
(19, 11, 7, '2025-12-20', '2025-12-25', 4, 5000, 'pending', '2025-12-16 09:54:36');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`) VALUES
(11, 'eherher', 'jerasir244@crsay.com', 'd6cfc61c43b384da5bfc0042fb7c6ff87a273658', 'user', '2025-12-15 08:32:37'),
(12, 'Hello', 'ember@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'admin', '2025-12-15 08:33:15'),
(13, 'Helloezanevem', 'fisip96839@kudimi.com', 'd6cfc61c43b384da5bfc0042fb7c6ff87a273658', 'user', '2025-12-16 08:19:15');

-- --------------------------------------------------------

--
-- Nézet szerkezete `accommodation_admin`
--
DROP TABLE IF EXISTS `accommodation_admin`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `accommodation_admin`  AS SELECT `a`.`id` AS `id`, `a`.`name` AS `name`, `a`.`description` AS `description`, `a`.`address` AS `address`, `a`.`capacity` AS `capacity`, `a`.`basePrice` AS `basePrice`, `a`.`active` AS `active`, `a`.`createdAt` AS `createdAt`, `ai`.`imagePath` AS `imagePath` FROM (`accommodations` `a` left join `accommodation_images` `ai` on(`ai`.`accommodationId` = `a`.`id`)) ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `accommodation_guest`
--
DROP TABLE IF EXISTS `accommodation_guest`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `accommodation_guest`  AS SELECT `a`.`id` AS `id`, `a`.`name` AS `name`, `a`.`description` AS `description`, `a`.`address` AS `address`, `a`.`capacity` AS `capacity`, `a`.`basePrice` AS `basePrice`, `a`.`active` AS `active`, `a`.`createdAt` AS `createdAt`, `ai`.`accommodationId` AS `accimgId`, `ai`.`imagePath` AS `imagePath` FROM (`accommodations` `a` join `accommodation_images` `ai` on(`a`.`id` = `ai`.`accommodationId`)) ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `bookingfull`
--
DROP TABLE IF EXISTS `bookingfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bookingfull`  AS SELECT `b`.`id` AS `id`, `b`.`accommodationId` AS `accommodationId`, `b`.`userId` AS `userId`, `u`.`email` AS `email`, `a`.`name` AS `accommodation`, `b`.`startDate` AS `startDate`, `b`.`endDate` AS `endDate`, `b`.`persons` AS `persons`, `b`.`totalPrice` AS `totalPrice`, `b`.`status` AS `status`, `b`.`createdAt` AS `createdAt` FROM ((`bookings` `b` join `accommodations` `a` on(`a`.`id` = `b`.`accommodationId`)) join `users` `u` on(`u`.`id` = `b`.`userId`)) ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `accommodation_images`
--
ALTER TABLE `accommodation_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accommodationId` (`accommodationId`);

--
-- A tábla indexei `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `accommodationId` (`accommodationId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `accommodations`
--
ALTER TABLE `accommodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `accommodation_images`
--
ALTER TABLE `accommodation_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `accommodation_images`
--
ALTER TABLE `accommodation_images`
  ADD CONSTRAINT `accommodation_images_ibfk_1` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`accommodationId`) REFERENCES `accommodations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
