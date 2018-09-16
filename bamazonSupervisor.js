var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("\n\n\n\n")
    supervisorOptions();
});

function supervisorOptions() {

    inquirer.prompt({
        name: "selected",
        type: "list",
        message: "\n\n\nHi Supervisor, select your option below: \n",
        choices: [
            "View Product Sales by Department",
            "Create New Department"
        ]
    }).then(function (answer) {
        switch (answer.selected) {
            case "View Product Sales by Department":
                console.log("Sales")
                viewProductSales()
                break;
            case "Create New Department":
                console.log("New Departmentnode")
                setTimeout(supervisorOptions, 1000)
                break;
        }
    })
}

function viewProductSales() {
    query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        setTimeout(supervisorOptions, 1000)
    })
}