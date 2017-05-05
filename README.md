# Bamazon (Shamazon)

## Description

Bamazon is a simple database management script that reads a MYSQL database file and allows a 'customer' to choose a product from it to order, along with the quantity they want.  The script will then update the amount of product remaining in that database.	


## Languages/Libraries Used
* Javascript
* Node
* MYSQL

## Getting Started

Clone or download the repository to your desktop.

Install the console.table, inquirer and mySQL npm packages.

Create a JavaScript file named config.js. Inside this file, export a MySQL configuration object as shown below:
module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'Bamazon'
};

Replace the password value in your configuration object with the password of your root MySQL user. (This should be the password you use to connect to your MySQL server in the MySQL Workbench. This password is empty by default, unless you specified a different one during the MySQL installation process.)

Use MYSQL to create a database of items.  A basic database script to populate this database with a few sample items has been provided for you ("databaseCreator")

## Testing the Script

Run "node bamazonCustomer"  
Run "node bamazonManager"

## Built With

* Sublime

## Author

* **Adam McNerney** - [NorthNern](https://github.com/NorthNern)

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration from everyone who has ever used the words 'netflix and chill'
* Gratitude to the NU Coding Boot Camp team
* etc.