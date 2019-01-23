
USE bamazon_db;

CREATE TABLE departments (
department_id INT NOT NULL auto_increment,
department_name VARCHAR(100) NOT NULL,
over_head_cost DECIMAL (10, 2) NULL,
PRIMARY KEY (department_id)

);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Appliances", 20000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Pet Supplies", 12000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Software", 10000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Beauty and Personal Care", 8000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Computer", 20000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Electronics", 8000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Sports and Outdoors", 8000);

INSERT INTO departments (department_name, over_head_cost)
VALUE("Groceries and Gourment", 8000);


