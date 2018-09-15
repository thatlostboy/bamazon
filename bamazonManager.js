var mysql = require("mysql");
var inquirer = require("inquirer");

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
    manageOptions();
});

function manageOptions() {

    inquirer.prompt({
        name: "selected",
        type: "list",
        message: "\n\n\nHi Manager, select your option below: \n",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function (answer) {
        switch (answer.selected) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    })
}
// Menu option 1:  View all inventory
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let price = parseFloat(res[i].price).toFixed(2)
            console.log(res[i].item_id + " : " + res[i].product_name + " : " + res[i].department_name + " : " + res[i].stock_quantity + "  $" + price)
        }
        setTimeout(manageOptions, 1000)
    })
}

// Menu option 2:  view low inventory
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let price = parseFloat(res[i].price).toFixed(2)
            console.log(res[i].item_id + " : " + res[i].product_name + " : " + res[i].department_name + " : " + res[i].stock_quantity + "  $" + price)
        }
        setTimeout(manageOptions, 1000)
    })
}

// Menu option 3:  add to inventory
// the next four functions are executed in sequence
//  addInventory--> verifyItem-->askQuantity-->updateInventory
function addInventory() {
    console.log("add Inventory x")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let price = parseFloat(res[i].price).toFixed(2)
            console.log(res[i].item_id + " : " + res[i].product_name + " : " + res[i].department_name + " : " + res[i].stock_quantity + "  $" + price)
        }
        inquirer.prompt({
            name: "itemChoice",
            type: "input",
            message: "Please enter the ID of the item you like to add inventory to: "
        }).then(function (answer) {
            // console.log(answer.itemChoice)
            verifyItem(answer.itemChoice)
        })
    })
}

function verifyItem(itemChoice) {
    query = "SELECT * FROM products where item_id = " + itemChoice
    connection.query(query, function (err, res) {
        if (err) throw err;
        if (res.length > 0) {
            askQuantity(itemChoice, res[0].product_name);
        } else {
            console.log("item does not exists.  please select another item\n")
            setTimeout(addInventory, 1000)
        }
    })
}
function askQuantity(itemChoice, itemName) {
    //console.log("how many items?")
    inquirer.prompt({
        name: "itemCountRequested",
        type: "input",
        message: "Please enter the quantity of \"" + itemName + "\" you are adding to the Inventory"
    }).then(function (answer) {
        updateInventory(itemChoice, itemName, answer.itemCountRequested)
    })
}

function updateInventory(itemChoice, itemName, itemCountRequested) {
    query = "UPDATE products SET stock_quantity = stock_quantity + " + itemCountRequested + "  WHERE item_id = " + itemChoice
    console.log(query)

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Inventory for \"" + itemName + "\" increased by " + itemCountRequested)
        setTimeout(manageOptions, 1000)
    })
}


// Menu option 4:  add new product
function addProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "Please enter product name: ",
        },
        {
            name: "department_name",
            type: "input",
            message: "Please enter department name of product: ",
        },
        {
            name: "price",
            type: "input",
            message: "Please enter price of product: ",
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "Please enter quantity of product: ",
        },
    ]).then(function (answer) {
        answer.stock_quantity = parseInt(answer.stock_quantity)
        answer.price = parseFloat(answer.price)
        insertValues = JSON.stringify(answer)
        query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (\"" + answer.product_name + "\",\"" + answer.department_name + "\"," + answer.price + "," + answer.stock_quantity + ")"
        // console.log(query)
      
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log("Product \""+answer.product_name+"\" added to DB!")
            setTimeout(manageOptions, 1000)
        })
        
    })
}