# Bamazon Homework

----
## Overview
An Amazon-like cli storefront app with a MySQL backend. This cli app will take in orders from customers and deplete stock from the store's inventory. This cli app will also track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.  This repository covers all three challenges of homework assignment:

* Challenge #1: Customer View, see [Video 1](https://youtu.be/Hlifq7Ij1pw)
* Challenge #2: Manager View, see [Video 2](https://youtu.be/oh6EJRU7fqw)(http://en.wikipedia.org/wiki/Markdown). 
* Challenge #3: Supervisor View     see [Video 3](http://en.wikipedia.org/wiki/Markdown)
* Updated Portfolio Page.    see [Portfolio Page](https://thatlostboy.github.io/Bootstrap-Portfolio/portfolio.html)

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

4. add in products and departments (manually with sql inserts, via csv import, or via bamazonManager.js and bamazonSupervisor.js)
5. Run one of the three files
 * node bamazonCustomer.js  
 * node bamazonManager.js
 * node bamazonSupervisor.js

----
## Details

### Challenge #1: Customer View (Minimum Requirement)   
* see video demo [Video 1](https://youtu.be/Hlifq7Ij1pw)
* sql database and tables built with at least 10 mock data
* create bamazomCustomer.js that will perform the following:     
  * show all items
  * prompt for item to buy
  * prompt for quantity
  * check quantity requested against inventory, if not enough, refuse order.  If enough, fulfill order aby reducing the inentory

### Challenge #2: Manager View (Next Level)
 * see video demo [Video 2](https://youtu.be/oh6EJRU7fqw)
 * create bamazonManager.js that list a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


### Challenge #3: Supervisor View (Final Level)
* create table "Departments" 
* create product_sales column and updates on purchases 
* Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:
  * View Product Sales by Department
    * show department_id, department_name, over_head_costs, product_sales, total_profit
    * total_profit calculated on the fly, not stored.
    * performed using this query:
       > SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit 
       > FROM departments INNER JOIN products ON departments.department_name = products.department_name
       > GROUP BY departments.department_id;
  * Create New Department

----
----
## Original HW Instructions

## Instructions

### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

- - -

* If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.

- - -

### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -

* If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.

- - -

### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

### Reminder: Submission on BCS

* Please submit the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
