-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS mydb;

-- Use the newly created database
USE mydb;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS delivers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS bases;

-- Create the 'users' table with a JSON column
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    enabled TINYINT NOT NULL DEFAULT 1
);

-- Create the 'bases' table
CREATE TABLE bases (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    base_address VARCHAR(255) NOT NULL,
    base_city VARCHAR(100) NOT NULL,
    base_zip_code VARCHAR(100) NOT NULL,
    enabled TINYINT NOT NULL DEFAULT 1
);

-- Create the 'delivers' table with a foreign key reference to 'bases'
CREATE TABLE delivers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    base_id INT NOT NULL,
    deliver_type VARCHAR(100) NOT NULL,
    deliver_duration VARCHAR(100),
    deliver_status VARCHAR(100),
    enabled TINYINT NOT NULL DEFAULT 1,
    FOREIGN KEY (base_id) REFERENCES bases(id)
);

-- Create the 'orders' table
CREATE TABLE orders (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    shipper VARCHAR(50) NOT NULL,
    from_address VARCHAR(255) NOT NULL,
    from_zip_code VARCHAR(100) NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    from_state VARCHAR(100) NOT NULL,
    from_phone VARCHAR(100),
    from_email VARCHAR(100),
    consignee VARCHAR(100) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    to_zip_code VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    to_state VARCHAR(100) NOT NULL,
    to_phone VARCHAR(100),
    to_email VARCHAR(100),
    total_weight INT NOT NULL,
    user_name VARCHAR(255),
    status VARCHAR(100),
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_id VARCHAR(255),
    price DECIMAL(10, 2),
    price_id VARCHAR(100),
    deliver VARCHAR(100),
    duration VARCHAR(100),
    distance DECIMAL(10,2),
    enabled TINYINT NOT NULL DEFAULT 1

);

-- Insert records into the 'bases' table
INSERT INTO bases (base_address, base_city, base_zip_code)
VALUES ('880 Post St', 'San Francisco', '94109');

INSERT INTO bases (base_address, base_city, base_zip_code)
VALUES ('668 Guerrero St', 'San Francisco', '94110');

INSERT INTO bases (base_address, base_city, base_zip_code)
VALUES ('1240 Egbert Ave', 'San Francisco', '94124');
