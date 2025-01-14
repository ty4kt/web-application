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
