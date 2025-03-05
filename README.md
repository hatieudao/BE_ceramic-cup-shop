# Ceramic Cups E-commerce Backend

This is the backend service for the Ceramic Cups E-commerce platform.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Docker
- Docker Compose

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Database Setup

Build the database Docker image:

```bash
docker build -t ceramic-cups-db -f DB-docker-file .
```

Run the database container:

```bash
docker run -d -p 3306:3306 --name ceramic-cups-db -v mysql_data:/var/lib/mysql ceramic-cups-db
```

### 3. Database Schema

The database schema includes the following tables:

```sql
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
  `total_price` DECIMAL(10,2),
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `OrderItems` (
  `id` CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  `order_id` CHAR(36),
  `product_type_id` CHAR(36),
  `quantity` INT,
  `price` DECIMAL(10,2)
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
```

### 4. Running the Application

```bash
# Development mode
yarn start:dev

# Production mode
yarn start:prod
```

## License

This project is licensed under the MIT License.
