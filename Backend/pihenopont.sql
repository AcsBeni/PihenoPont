-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 16. 09:11
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
(3, 'Old Town Event Space', 'Historic venue located in the heart of the old town.', 'Eger, Dobó tér 3.', 200, 1400.00, 1, '2025-12-15 07:59:39'),
(4, 'City Expo Hall', 'Large expo hall for exhibitions and trade shows.', 'Debrecen, Vásár utca 10.', 1200, 4200.00, 1, '2025-12-15 07:59:39'),
(5, 'Grand Hall', 'Updated description', 'New Address 12', 200, 199.99, 1, '2025-12-15 07:59:39'),
(6, 'Corporate Meeting Hub', 'Designed for business meetings and workshops.', 'Győr, Ipar út 6.', 120, 900.00, 1, '2025-12-15 07:59:39'),
(7, 'Royal Ballroom', 'Elegant ballroom for luxury events and galas.', 'Budapest, Király utca 20.', 600, 3800.00, 1, '2025-12-15 07:59:39'),
(8, 'Community Cultural Center', 'Affordable venue for community and cultural events.', 'Szeged, Kossuth Lajos sugárút 15.', 250, 800.00, 1, '2025-12-15 07:59:39'),
(9, 'Industrial Loft Space', 'Minimalist industrial-style loft for creative events.', 'Budapest, Soroksári út 45.', 180, 1300.00, 0, '2025-12-15 07:59:39'),
(10, 'Mountain View Lodge', 'Event venue with scenic mountain surroundings.', 'Mátra, Fenyves utca 2.', 150, 1600.00, 1, '2025-12-15 07:59:39');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `accommodation_images`
--

CREATE TABLE `accommodation_images` (
  `id` int(11) NOT NULL,
  `accommodationId` int(11) NOT NULL,
  `imagePath` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `bookingfull`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `bookingfull` (
`id` int(11)
,`email` varchar(255)
,`accommodation` varchar(255)
,`startDate` date
,`endDate` date
,`persons` int(11)
,`Totalprice` decimal(10,2)
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
  `totalPrice` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `accommodationId`, `startDate`, `endDate`, `persons`, `totalPrice`, `status`, `createdAt`) VALUES
(2, 11, 2, '2025-12-21', '2025-12-26', 4, 5200.00, 'confirmed', '2025-12-15 09:56:21');

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
(12, 'TRAlalelo', 'ember@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'admin', '2025-12-15 08:33:15');

-- --------------------------------------------------------

--
-- Nézet szerkezete `bookingfull`
--
DROP TABLE IF EXISTS `bookingfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bookingfull`  AS SELECT `b`.`id` AS `id`, `u`.`email` AS `email`, `a`.`name` AS `accommodation`, `b`.`startDate` AS `startDate`, `b`.`endDate` AS `endDate`, `b`.`persons` AS `persons`, `b`.`totalPrice` AS `Totalprice`, `b`.`status` AS `status`, `b`.`createdAt` AS `createdAt` FROM ((`bookings` `b` join `accommodations` `a` on(`a`.`id` = `b`.`accommodationId`)) join `users` `u` on(`u`.`id` = `b`.`userId`)) ;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `accommodation_images`
--
ALTER TABLE `accommodation_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
