# Bamazon
This application is the Amazon-like digital storefront built using a Node.js & MySQL . This is a command line Node app that works as an online retailer.

# Technologies used
- MySQL
- Node.js
- npm packages


MySQL
The JavaScript files mentioned above query a MySQL database called Bamazon which is locally hosted on my laptop.
Please refer to the schema.sql file to see how the database was created using raw SQL queries.
If you wish to run this app on your own machine, then please note the following commands:

If you are new to MySQL, please set up MySQL and MySQL Workbench on your laptop and then open up to your localhost connection.
Run CREATE DATABASE_DB Bamazon; in mySQL Workbench.
Be sure to select the correct database by running the USE Bamazon;
Refer to the raw SQL commands under the === bamazonCustomer.sql === comment to set up the Products table.
Refer to the raw SQL commands under the === departments.sql === comment to set up the Departments table.
Node Package Manager (npm)
If you clone this repo down to your machine, note that it has two npm dependencies! Before running the JavaScript files mentioned above, please run npm install in your terminal to download the prompt and mysql node packages.

# Getting Started
There are Three JavaScript files that replicate the basics of this ecommerce application:

1. BamazonCustomer.js

Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory. Below is a demo of the BamazonCustomer.js file...
Running node BamazonCustomer.js will use MySQL to pull up all the products for sale.
The customer can then choose a product using its ID and then enter a quantity to buy. 

-- Customer Order
If the inventory has enough items, the order will be processed and says: Order placed successfully!
If the inventory is low, the order will not be processed and it will say: Insufficient quantity!

![GitHub Logo](/images/logo.png)

2. BamazonManager.js

The shows the basics of a warehouse management system, providing managers with a list of options to view stock and adjust inventory.
A sample of the menu is below:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product
Below is a demo of the BamazonManager.js file...
Running node BamazonManager.js will display a menu and perform the specific requests. Manager Menu
The manager can choose option 1 to view the current inventory. 
The manager can choose option 2 to see low items in inventory (less than 5 in stock). 
The manager can choose option 3 to re-stock existing items.
The manager can choose option 4 to add new items for sale. 


3. BamazonSupervisor.js 

Simulates very basic profit and sales insights for the supervisor.
A sample of the menu is below:
 - View Product Sales by Department
 - Create New Department
 Below is a demo of the BamazonSupervisor.js file...
Running node BamazonSupervisor.js will display a menu and will ask to choose from two different option.
The supervisor can choose option 1 to view the sales by department.
The supervisor can choose option 2 to add a new department.

Notice how the department list was adjusted from step 2. 
Also note that the manager can add a new item to the department and if a customer buys said item, it will cause total sales and profit to increase in that department.

