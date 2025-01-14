To run the application in your command line interface you will need to run the following commands:

npm install express
npm install bcrypt

These commands are needed to install the packages and modules that are needed in the set up of the application. In the second part of the setup of the application the lines of code needed in the create_db.sql file and the insert_test_data.sql file need to be copied and pasted into your MYSQL command line interface to create and set up the database for the fireworks and the corresponding manufacturers. This also grants privileges to the user for CRUD operations to use the database.

# Create database script for Fireworks database

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

# Insert data into the tables
USE fireworks;
-- Insert sample manufacturers
INSERT INTO Manufacturers (name, location, contact)
VALUES 
('SkyBlast Inc.', 'New York, USA', '123-456-7890'),
('PyroMasters', 'London, UK', '987-654-3210');

-- Insert sample fireworks
INSERT INTO Fireworks (name, type, color, effect, price, manufacturer_id)
VALUES
('Starburst Rocket', 'Rocket', 'Red, Green', 'Exploding stars', 19.99, 1),
('Golden Fountain', 'Fountain', 'Gold', 'Shimmering sparks', 14.99, 2),
('Twilight Sparkler', 'Sparkler', 'Silver', 'Long-lasting spark', 4.99, 1);

-- Insert sample sales
INSERT INTO Sales (firework_id, quantity, sale_date, total_price)
VALUES
(1, 10, '2025-01-10', 199.90),
(2, 5, '2025-01-11', 74.95);

# Custom queries

# Fireworks + Manufacturers
SELECT Fireworks.name AS Firework, Fireworks.type, Manufacturers.name AS Manufacturer
FROM Fireworks
JOIN Manufacturers ON Fireworks.manufacturer_id = Manufacturers.manufacturer_id;

# Total Sales of Each Firework
SELECT Fireworks.name, SUM(Sales.quantity) AS Total_Quantity_Sold, SUM(Sales.total_price) AS Total_Sales
FROM Sales
JOIN Fireworks ON Sales.firework_id = Fireworks.firework_id
GROUP BY Fireworks.name;

This code adds 3 fireworks and their respective manufacturers to the database.
