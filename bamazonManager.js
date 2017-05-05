var mysql = require("mysql");
require('console.table');
var inquirer = require("inquirer");

var config = require('./config.js');
var dbConnection = mysql.createConnection(config);


dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + dbConnection.threadId);
});

function managerOptions(){
inquirer.prompt({
    name: "managerChoices",
    type: "rawlist",
    message: "Would you like to: \n[1] View products for sale.\n[2] View low inventory \n[3] Add to inventory \n[4] Add new product?",
    choices: ["1", "2", "3", "4"]
  }).then(function(answer) {
    if (answer.managerChoices === "1") {
      //View products for sale
      dbConnection.query("SELECT * FROM products", function(err,res) {
      if (err) throw err;
      console.table(res);
      });
    } else if (answer.managerChoices === "2") {
      //View low inventory
      dbConnection.query("SELECT * FROM products WHERE stock_quantity < 5 ", function(err,res) {
      if (err) throw err;
      console.table(res);
      });
    } else if (answer.managerChoices === "3") {
      //Add to inventory
      dbConnection.query("SELECT * FROM products", function(err,res) {
      if (err) throw err;
      console.table(res);
      });
      inquirer.prompt([{
      name: "itemID",
      type: "input",
      message: "Enter the item ID of the item you wish to add more of."
    }, {
      name: "itemQuantity",
      type: "input",
      message: "Enter the amount of this product you wish to add (please use number digits)."
    }]).then(function(answer) {// when finished prompting
        var itemInventoryToAdd = parseInt(answer.itemQuantity);
        var itemInventoryNewTotal;
        var itemID = parseInt(answer.itemID);       
        if  (itemInventoryToAdd === NaN || itemID === NaN){
          console.log("Sorry, the item ID or quantity you entered was not a valid number.")
        }
        else {
          dbConnection.query("SELECT * FROM products WHERE item_id = " + itemID, function(err,res){
          if (err) throw err;
          itemInventoryNewTotal = res.stock_quantity + itemInventoryToAdd;
          });
          dbConnection.query("UPDATE products SET stock_quantity=" + itemInventoryNewTotal + " WHERE item_id = " + itemID, function(err,res){
          });
        }
    });
    } else if (answer.managerChoices === "4") {
      //Add new product
      inquirer.prompt([{
      name: "itemName",
      type: "input",
      message: "Enter the name of the item you wish to add."
    }, {
      name: "itemDepartment",
      type: "input",
      message: "Enter the department of this product."
    }, {
      name: "itemPrice",
      type: "input",
      message: "Enter the price of this item."
    }, {
      name: "itemQuantity",
      type: "input",
      message: "Enter the amount of this item you wish to list in Bamazon's current stock (using numbers, not text)."
    }]).then(function(answer) {// when finished prompting
        var itemName = answer.itemName;
        var itemDepartment = answer.itemDepartment; 
        var itemPrice = parseFloat(answer.itemPrice);
        var itemQuantity = parseInt(answer.itemQuantity);   
        if  (itemQuantity === NaN || itemQuantity < 0 || itemPrice === NaN || itemPrice < 0){
          console.log("Sorry, the item price or quantity you entered was not a valid number.")
        }
        else {
          dbConnection.query("INSERT INTO products (product_name, dept_name, price, stock_quantity) VALUES ('"+itemName+"','"+itemDepartment+"',"+itemPrice+","+itemQuantity+");", function(err,res){
          });
          }
    });
    } else {
      // managerOptions();
    }
  });
  // managerOptions();
}
managerOptions();
