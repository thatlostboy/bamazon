# Bamazon Homework

----
## Overview
Aan Amazon-like cli storefront with a MySQL backend. This cli app will take in orders from customers and deplete stock from the store's inventory. This cli app will also track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.  This repository covers all three challenges of homework assignment:

* Challenge #1: Customer View  see [Video 1](http://en.wikipedia.org/wiki/Markdown)
* Challenge #2: Manager View  see [Video 2](http://en.wikipedia.org/wiki/Markdown). 
* Challenge #3: Supervisor View see [Video 3](http://en.wikipedia.org/wiki/Markdown)

Node packages used:

* mysql
* inquirer
* easy-table (console.table was easier but did not have formatting for the price)


----
## Usage
1. clone repository
1. npm install
1. run mySQL commands from lines 1 through 25 "bamazonCustomer.sql" to
  * create database "bamazon_db"
  * create table "products" with fields: item_id, product_name, department_name, price, stock_quantity, product_sales
  * create table "departments" with fields:  
department_id, department_name, over_head_costs

1. add in products and departments (manually with sql inserts, via csv import, or via bamazonManager.js and bamazonSupervisor.js)
1. Run one of the three files
 * node bamazonCustomer.js
 * node bamazonManager.js
 * node bamazonSupervisor.js

----
## Details



