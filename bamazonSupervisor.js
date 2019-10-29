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
  console.log("Welcome, Bamazon Supervisor")
});

function supervisorOptions() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "EXIT APP"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          showInventory();
          break;
  
        case "View Low Inventory":
          showLowInvent();
          break;

        case "Add to Inventory":
          addInvent();
          break;

        case "Add New Product":
          addProduct();
          break;
        
        case "EXIT APP":
          connection.end();
          break;
        }
      });
  }

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
      supervisorOptions();
    });
}

supervisorOptions();