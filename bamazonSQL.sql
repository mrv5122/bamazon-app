
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products
(
item_id INTEGER(20) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(20),
department_name VARCHAR(20),
price_dollars DECIMAL (5,2),
stock_quantity DECIMAL (3,0),
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price_dollars, stock_quantity)
VALUES 
("bananas", "FOOD", "300", "55"),
("apples", "FOOD", "350", "40"),
("CALL OF DUTY", "ELECTRONICS", "5599", "30"),
("pillow", "HOME", "2000", "100"),
("futon", "HOME", "10000", "20"),
("old spice shampoo", "BATH", "759", "120"),
("deodorant", "BATH", "500", "108"),
("mouse", "ELECTRONICS", "4000", "67"),
("wireless keyboard", "ELECTRONICS", "5000", "71"),
("candle", "HOME", "1533", "200"),
("grapes", "FOOD", "650", "33"),
("body sponge", "BATH", "200", "99");

SELECT * FROM products;