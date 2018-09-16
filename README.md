# Bamazon Homework

----
## Overview
Repository covers all three challenges of homework assignment:

* Challenge #1: Customer View  see [Video 1](http://en.wikipedia.org/wiki/Markdown)
* Challenge #2: Manager View see [Video 2](http://en.wikipedia.org/wiki/Markdown). 
* Challenge #3: Supervisor View see [Video 3](http://en.wikipedia.org/wiki/Markdown)

packages used:

* mysql
* inquirer
* easy-table (console.table was easier but did not have formatting for the price)



> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".

----
## usage
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
## markdown quick reference
# headers

*emphasis*

**strong**

* list

>block quote

    code (4 spaces indent)
[links](http://wikipedia.org)

----
## changelog
* 17-Feb-2013 re-design

----
## thanks
* [markdown-js](https://github.com/evilstreak/markdown-js)

