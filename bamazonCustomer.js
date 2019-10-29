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
  console.log("Connected as ID" + connection.threadId);
});


function showInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err,res) {
        if (err) throw err;
        var productTable = new Table ({
          head: ["Item ID", "Product Name", "Category", "Price", "Stock Qty"],
          colWidths: [12, 24, 20, 12, 15]
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
      message: "How many of this item would you like to purchase?"
    }
  ])
  .then(answer => {
    item_id = answer.item_id;
    qtyPurchase = answer.quantityDesired;
  });
 }

 showInventory();