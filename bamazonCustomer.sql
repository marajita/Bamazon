CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
selling_price  DECIMAL(10,2) NULL,
stock_quantity  INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Hamilton Beach All-Metal Drink Mixer, Gray", "Appliances", 99.56, 10);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("6 Wooden Spoons For Cooking", "Appliances", 14.39, 15 );

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("All in One Snail Repair Cream 120ml", "Beauty and Personal Care", 19.00, 20);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Stila Stay All Day Liquid Lipstick", "Beauty and Personal Care", 22.50, 10);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("HP OfficeJet 5255 Wireless All-in-One Printer", "Computer", 95.99, 5);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("HP 24-inch All-in-One Computer", "Computer", 488.64, 3);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Zero Grain Natural Dry Dog Food", "Pet Supplies", 39.89, 10);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Blue Sizzlers Original Pork 6-Oz", "Pet Supplies", 4.22, 20);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Cupcake Assortment - 12 Cupcakes", "Grocery and Gourment", 11.90, 15);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Royal White Basmati Rice, 20 Pound", "Grocery and Gourment", 16.00, 20);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Doritos Nacho Cheese Flavored Tortilla Chips", "Groceries", 4.19, 40);

INSERT INTO products (product_name, department_name, selling_price, stock_quantity)
VALUE ("Norton Security Premium – 5 Devices", "Software", 25.60, 8);

