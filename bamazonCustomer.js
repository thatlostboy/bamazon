var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table")


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
    askItemToBuy();
});

function askItemToBuy() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var t = new Table
        for (let i = 0; i < res.length; i++) {
            //let price = parseFloat(res[i].price).toFixed(2)
            //console.log(res[i].item_id + ": " + res[i].product_name + "   $" + price)
            t.cell('Item ID', res[i].item_id)
            t.cell('Product', res[i].product_name)
            t.cell('Price',res[i].price, Table.number(2))
            t.newRow()
        }
        console.log(t.toString())
        inquirer.prompt({
            name: "itemChoice",
            type: "input",
            message: "Please enter the \"Item ID\" of the item you like to buy: "
        }).then(function (answer) {
            // console.log(answer.itemChoice)
            
            if (answer.itemChoice) {
                verifyItem(answer.itemChoice)
            } else {
                askItemToBuy()
            }
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
            setTimeout(askItemToBuy, 1000)
        }
    })
}

function askQuantity(itemChoice, itemName) {
    //console.log("how many items?")
    inquirer.prompt({
        name: "itemCountRequested",
        type: "input",
        message: "Please enter the quantity of \"" + itemName + "\" you would like to purchase?"
    }).then(function (answer) {
        if (answer.itemCountRequested) {
            verifyPurchase(itemChoice, itemName, answer.itemCountRequested)
        } else {
            askQuantity(itemChoice, itemName)
        }
        
    })
}


function verifyPurchase(itemChoice, itemName, itemCountRequested) {
    query = "SELECT * FROM products where item_id = " + itemChoice

    connection.query(query, function (err, res) {
        if (err) throw err;
        itemCountStock = res[0].stock_quantity
        if (itemCountStock >= itemCountRequested) {
            itemCountStockUpdate = itemCountStock - itemCountRequested
            product_salesUpdate = res[0].product_sales + itemCountRequested * res[0].price
            console.log(product_salesUpdate)

            // purchase item by updating inventory and product_sales via query
            query = "UPDATE products SET stock_quantity = " + itemCountStockUpdate + ", product_sales = "+product_salesUpdate+" WHERE item_id = " + itemChoice
            // console.log(query
            connection.query(query, function (err, res) {
                if (err) throw err;
                console.log("You just purchased " + itemCountRequested + " \"" + itemName + "\"(s).")
                setTimeout(askItemToBuy, 1000)
            })
        } else {
            console.log("Sorry, we only have " + itemCountStock + " \"" + itemName + "\"s in stock.")
            setTimeout(function () {
                askQuantity(itemChoice, itemName)
            }, 1000)
        }
    })
}
