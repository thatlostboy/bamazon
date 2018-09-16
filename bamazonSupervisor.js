var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table');

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
                addDept()
                break;
        }
    })
}

function viewProductSales() {
    // see bamazoncustomer.SQL for queries tested
    query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) as product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id;"
    connection.query(query, function (err, res) {
        if (err) throw err;

        var t = new Table
        for (let i = 0; i < res.length; i++) {
            //let price = parseFloat(res[i].price).toFixed(2)
            //console.log(res[i].item_id + ": " + res[i].product_name + "   $" + price)
            t.cell('Dept ID', res[i].department_id)
            t.cell('Dept Name', res[i].department_name)
            t.cell('OverHead Cost', res[i].over_head_costs, Table.number(2))
            t.cell('Product Sales', res[i].product_sales, Table.number(2))
            t.cell('Total Profit', res[i].total_profit, Table.number(2))
            t.newRow()
        }
        console.log(t.toString())
        setTimeout(supervisorOptions, 1000)
    })
}


function addDept() {
    inquirer.prompt([
        {
            name: "department_name",
            type: "input",
            message: "Please enter department name: ",
        },
        {
            name: "department_overhead",
            type: "input",
            message: "Please enter department overhead: ",
        },
    ]).then(function (answer) {
        answer.department_overhead = parseFloat(answer.department_overhead)
        insertValues = JSON.stringify(answer)
        query = "INSERT INTO departments (department_name, over_head_costs) VALUES (\"" + answer.department_name + "\",\"" + answer.department_overhead + "\")"
        // console.log(query)

        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("Department \"" + answer.department_name + "\" added to DB!")
            setTimeout(supervisorOptions, 1000)
        })

    })
}