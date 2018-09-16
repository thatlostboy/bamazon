DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
	stock_quantity INTEGER NULL,
    product_sales DECIMAL(10,2) DEFAULT 0.00,
    PRIMARY KEY(item_id)
);

USE bamazon_db;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NULL,
    over_head_costs  DECIMAL(10,2) DEFAULT 100.00,
    PRIMARY KEY(department_id)
);


 
USE bamazon_db;
select * from departments;

USE bamazon_db;
select * from products;


USE bamazon_db;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('tom','fred',123,123);

USE bamazon_db;
SELECT department_name, SUM(product_sales) as product_sales FROM products GROUP BY department_name;

USE bamazon_db;
SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM departments INNER JOIN products ON departments.department_name = products.department_name;

USE bamazon_db;
SELECT departments.department_id, departments.department_name, departments.over_head_costs, 
	SUM(products.product_sales) as product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit
FROM departments INNER JOIN products ON departments.department_name = products.department_name
GROUP BY departments.department_id;
