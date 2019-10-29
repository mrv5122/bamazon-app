var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Omicronf15",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
  console.log("Welcome to Bamazon! Here are our products:")
});


function showInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err,res) {
        if (err) throw err;
        var productTable = new Table ({
          head: ["Item ID", "Product Name", "Category", "Price ($)", "Qty"],
          colWidths: [10, 20, 15, 12, 10]
        });
        for (var i = 0; i < res.length; i++) {
          productTable.push(
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price_dollars, res[i].stock_quantity]
          );
        }
      console.log(productTable.toString());
      productSearch();
    });
}

function productSearch() {
  inquirer
    .prompt([
      {
      name: "itemID",
      type: "input",
      message: "Enter desired product ItemID",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "quantityDesired",
      type: "input",
      message: "How many of this item would you like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(answers => {
    item_id = answers.itemID;
    qtyPurchased = answers.quantityDesired;
    executeOrder(item_id, qtyPurchased)
  });
 }

function executeOrder(item_id, qtyPurchased) {
  connection.query("Select * FROM products WHERE item_id = " + item_id, function(err, res) {
    if (err) {
      console.log(err);
      throw err;
    };
    if (qtyPurchased <= res[0].stock_quantity) {
    var CartCost = res[0].price_dollars * qtyPurchased;
    console.log("Your order is in stock!");
    console.log("You ordered " + qtyPurchased + " " + res[0].product_name + "(s)");
    console.log("The total cost of your order is $" + CartCost);

    connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qtyPurchased + " WHERE item_id = " + item_id);
    }
     else {console.log("Cannot buy " + qtyPurchased + " of " + res[0].product_name + ". Insufficient quantity in stock.");
      };
      showInventory();
    })
}

 showInventory();