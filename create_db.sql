# Create database script for Bettys books

# Create the database
CREATE DATABASE IF NOT EXISTS fireworks;
USE fireworks;

# Create the tables
-- Create the Fireworks table
CREATE TABLE Fireworks (
    firework_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    color VARCHAR(50),
    effect VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    manufacturer_id INT,
    FOREIGN KEY (manufacturer_id) REFERENCES Manufacturers(manufacturer_id)
);

-- Create the Manufacturers table
CREATE TABLE Manufacturers (
    manufacturer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    contact VARCHAR(50)
);

-- Create the Sales table (optional)
CREATE TABLE Sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    firework_id INT NOT NULL,
    quantity INT NOT NULL,
    sale_date DATE NOT NULL,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (firework_id) REFERENCES Fireworks(firework_id)
);

CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), username VARCHAR(20), 
password VARCHAR(20), email VARCHAR(50), hashedPassword VARCHAR(100), PRIMARY KEY(id));
# Create the app user
CREATE USER IF NOT EXISTS 'fireworks_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON fireworks.* TO 'fireworks_app'@'localhost';
