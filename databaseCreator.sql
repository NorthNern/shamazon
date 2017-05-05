create database Bamazon;

use Bamazon;


CREATE table products (
	item_id integer(11) auto_increment not null,
    product_name VARCHAR(100),
    dept_name VARCHAR(100),
    price DECIMAL (10,2),
    stock_quantity INTEGER (10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Used Taco Bell Sporks", "Miscellaneous", 50, 300);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Backpacks", "School Supplies", 30, 100);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Rotary Phones", "Miscellaneous", 1, 20);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Squirrel Sweaters", "Pet Supplies", 5000, 3);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Solar Powered Flashlights", "Miscellaneous", 30, 10);

INSERT INTO products (product_name, dept_name, price, stock_quantity)
VALUES ("Doggy Diapers", "Pet Supplies", 20, 50);

