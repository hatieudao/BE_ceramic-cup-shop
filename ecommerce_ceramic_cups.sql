CREATE TABLE `Users` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE,
  `password` VARCHAR(255),
  `refresh_token` VARCHAR(255),
  `is_admin` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Address` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `user_id` CHAR(36),
  `full_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `address_line1` VARCHAR(255),
  `address_line2` VARCHAR(255),
  `city` VARCHAR(100),
  `state` VARCHAR(100),
  `postal_code` VARCHAR(20),
  `country` VARCHAR(100),
  `phone` VARCHAR(20),
  `is_default` BOOLEAN DEFAULT false,
  `address_name` ENUM('work', 'home', 'other') DEFAULT 'other',
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Products` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `name` VARCHAR(255),
  `description` TEXT,
  `is_deleted` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `ProductTypes` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `product_id` CHAR(36),
  `name` VARCHAR(255),
  `description` TEXT,
  `price` DECIMAL(10,2),
  `stock` INT,
  `image_url` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Payment` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `user_id` CHAR(36),
  `payment_method` ENUM('credit_card', 'debit_card', 'bank_transfer', 'cash_on_delivery') NOT NULL,
  `card_number` VARCHAR(255),
  `card_holder_name` VARCHAR(255),
  `expiry_date` VARCHAR(7),
  `payment_status` ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  `is_default` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `Orders` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `user_id` CHAR(36),
  `payment_id` CHAR(36),
  `status` ENUM('pending','completed','canceled') DEFAULT 'pending',
  `delivery_address_id` CHAR(36),
  `delivery_charge` DECIMAL(10,2) DEFAULT 10,
  `total_price` DECIMAL(10,2),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `order_note` TEXT,
);

CREATE TABLE `OrderItems` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `order_id` CHAR(36),
  `product_type_id` CHAR(36),
  `quantity` INT,
  `price` DECIMAL(10,2)
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
);

CREATE TABLE Carts (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `user_id` CHAR(36),
  `total_item` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `CartItems` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `cart_id` CHAR(36),
  `product_type_id` CHAR(36),
  `quantity` INT,
  `price` DECIMAL(10,2),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `ProductTypes` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`id`);

ALTER TABLE `OrderItems` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`);

ALTER TABLE `OrderItems` ADD FOREIGN KEY (`product_type_id`) REFERENCES `ProductTypes` (`id`);

ALTER TABLE `Cart` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `CartItems` ADD FOREIGN KEY (`product_type_id`) REFERENCES `ProductTypes` (`id`);

ALTER TABLE `CartItems` ADD FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`);

ALTER TABLE `Address` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Payment` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`delivery_address_id`) REFERENCES `Address` (`id`);

-- Insert the admin user
INSERT INTO Users (name, email, password, refresh_token, is_admin) 
VALUES ('Admin Seller', 'admin@example.com', '$2a$12$eocRcg/LjH6AHQeigb.l2u3hjRjQ9L3aeRJGYF1OSFbG6OSDHWKLa', 'refresh_token', TRUE);

-- Insert 10 products
INSERT INTO Products (name, description) VALUES
('Elegant White Cup', 'A classic white ceramic cup perfect for coffee or tea.'),
('Vintage Floral Cup', 'A beautifully designed floral ceramic cup for tea lovers.'),
('Matte Black Cup', 'A sleek matte black ceramic cup for modern aesthetics.'),
('Rustic Handmade Cup', 'A handcrafted rustic ceramic cup with a unique texture.'),
('Minimalist Blue Cup', 'A simple yet elegant blue ceramic cup.'),
('Glazed Green Cup', 'A green ceramic cup with a glossy finish.'),
('Speckled Beige Cup', 'A speckled beige ceramic cup for an earthy look.'),
('Classic Red Cup', 'A vibrant red ceramic cup perfect for any setting.'),
('Luxury Gold Rim Cup', 'A high-end ceramic cup with a gold rim.'),
('Japanese Style Cup', 'A traditional Japanese-style ceramic cup.');

-- Insert product types (at least 2 per product)
INSERT INTO ProductTypes (product_id, name, description, price, stock, image_url) VALUES
((SELECT id FROM Products LIMIT 1 OFFSET 0), 'Standard Size', '250ml classic white ceramic cup.', 10.99, 50, 'images/white_cup_standard.jpg'),
((SELECT id FROM Products LIMIT 1 OFFSET 0), 'Large Size', '350ml classic white ceramic cup.', 12.99, 30, 'images/white_cup_large.jpg'),
((SELECT id FROM Products LIMIT 1 OFFSET 1), 'Small Size', '200ml vintage floral ceramic cup.', 9.99, 40, 'images/floral_cup_small.jpg'),
((SELECT id FROM Products LIMIT 1 OFFSET 1), 'Standard Size', '300ml vintage floral ceramic cup.', 11.99, 35, 'images/floral_cup_standard.jpg');


-- Insert 10 more products
INSERT INTO Products (name, description) VALUES
('Elegant Silver Cup', 'A stylish silver-plated ceramic cup for a touch of luxury.'),
('Modern Geometric Cup', 'A contemporary cup with geometric patterns.'),
('Pastel Pink Cup', 'A soft pastel pink ceramic cup for a cozy feel.'),
('Classic Navy Cup', 'A deep navy blue ceramic cup with a glossy finish.'),
('Sunset Gradient Cup', 'A beautiful gradient cup resembling a sunset.'),
('Textured Stone Cup', 'A cup with a stone-like texture for a rustic feel.'),
('Nordic Style Cup', 'A minimalist Nordic-inspired ceramic cup.'),
('Crystal Clear Glass Cup', 'A transparent glass cup for a sleek look.'),
('Cottagecore Floral Cup', 'A cute floral cup perfect for cottagecore aesthetics.'),
('Hand-Painted Artistic Cup', 'A hand-painted ceramic cup with unique designs.');

-- Insert product types (at least 2 per product)
INSERT INTO ProductTypes (product_id, name, description, price, stock, image_url) VALUES
((SELECT id FROM Products LIMIT 1 OFFSET 10), 'Standard Size', '250ml elegant silver-plated ceramic cup.', 14.99, 20, 'https://via.placeholder.com/150/0000FF/808080?text=Silver+Cup'),
((SELECT id FROM Products LIMIT 1 OFFSET 10), 'Large Size', '350ml elegant silver-plated ceramic cup.', 16.99, 15, 'https://via.placeholder.com/150/0000FF/808080?text=Silver+Cup+Large'),
((SELECT id FROM Products LIMIT 1 OFFSET 11), 'Patterned', '300ml geometric pattern ceramic cup.', 12.99, 25, 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Geometric+Cup'),
((SELECT id FROM Products LIMIT 1 OFFSET 11), 'Minimalist', '250ml simple geometric ceramic cup.', 10.99, 30, 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Geometric+Minimalist'),
((SELECT id FROM Products LIMIT 1 OFFSET 12), 'Pastel Edition', '250ml pastel pink ceramic cup.', 9.99, 40, 'https://via.placeholder.com/150/FFC0CB/000000?text=Pastel+Pink+Cup'),
((SELECT id FROM Products LIMIT 1 OFFSET 12), 'Cozy Large', '350ml pastel pink ceramic cup.', 11.99, 35, 'https://via.placeholder.com/150/FFC0CB/000000?text=Pastel+Pink+Large'),
((SELECT id FROM Products LIMIT 1 OFFSET 13), 'Glossy Finish', '300ml classic navy ceramic cup.', 13.99, 25, 'https://via.placeholder.com/150/000080/FFFFFF?text=Navy+Cup'),
((SELECT id FROM Products LIMIT 1 OFFSET 13), 'Matte Finish', '250ml classic navy ceramic cup.', 11.99, 30, 'https://via.placeholder.com/150/000080/FFFFFF?text=Navy+Matte'),
((SELECT id FROM Products LIMIT 1 OFFSET 14), 'Sunset Edition', '250ml sunset gradient ceramic cup.', 14.99, 20, 'https://via.placeholder.com/150/FF4500/FFFFFF?text=Sunset+Cup'),
((SELECT id FROM Products LIMIT 1 OFFSET 14), 'Twilight Edition', '350ml twilight gradient ceramic cup.', 16.99, 15, 'https://via.placeholder.com/150/8B0000/FFFFFF?text=Twilight+Cup');