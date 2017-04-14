CREATE DATABASE Bamazon;

USE Bamazon

CREATE TABLE Products
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_ame VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price INT,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

