var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");
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
  showInventory();
});


function showInventory() {
    var query = "SELECT item_id, product_name, price_dollars FROM products";
    connection.query(query, function(err,res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i]);
        }
    })
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
productSearch();