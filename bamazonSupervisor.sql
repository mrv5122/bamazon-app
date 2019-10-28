USE bamazon_db;
CREATE TABLE departments
(
department_id INTEGER(20) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(20),
over_head_costs DECIMAL (7,2),
product_sales DECIMAL (7,2),
total_profit DECIMAL (7,2)
PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs, product_sales)
VALUES 
("bananas", "FOOD", "300"),
("apples", "FOOD", "350"),
("CALL OF DUTY", "GAMING", "5599"),
("pillow", "HOME", "2000");


("", "", ""),
("", "", ""),
("", "", ""),
("", "", ""),
("", "", ""),
("", "", ""),
("", "", ""),
("", "", "");

SELECT * FROM products;