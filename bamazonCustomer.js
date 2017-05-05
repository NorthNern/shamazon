var mysql = require("mysql");
require('console.table');
var inquirer = require("inquirer");

var config = require('./config.js');
var dbConnection = mysql.createConnection(config);


dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + dbConnection.threadId);
});


function customerPurchase(){
	dbConnection.query("SELECT * FROM products", function(err,res) {
  		if (err) throw err;
  		console.table(res);
	});

	inquirer.prompt([{
    	name: "itemID",
    	type: "input",
    	message: "Enter the item ID of the item you wish to purchase."
  	}, {
    	name: "itemQuantity",
    	type: "input",
    	message: "Enter the amount of this product you wish to purchase (please use number digits)."
  	}]).then(function(answer) {// when finished prompting
  			var itemPurchaseQuantity = parseInt(answer.itemQuantity);
  			var itemPurchaseID = parseInt(answer.itemID);  			
  			if  (itemPurchaseQuantity === NaN || itemPurchaseQuantity <0 || itemPurchaseID === NaN){
  				console.log("Sorry, the item ID or quantity you entered was not a valid number.")
  			}
  			else {
  				dbConnection.query("SELECT * FROM products WHERE item_id = " + itemPurchaseID, function(err,res){
 					if (err) throw err;
 					if (itemPurchaseQuantity > res.stock_quantity){
 						console.log("Sorry, we don't have that much in stock.")
 					}
 					else {
 						var totalCost = (res.price * itemPurchaseQuantity);
 						console.log("Your total cost is " + totalCost)
 						var itemQuantityAfterPurchase = res.stock_quantity - itemPurchaseQuantity;
 						dbConnection.query("UPDATE products SET stock_quantity=" + itemQuantityAfterPurchase + " WHERE item_id = " + itemPurchaseID, function(err,res){
 						});


 					}

				});

  			}

  	});
    // customerPurchase();
}



customerPurchase();
