CREATE DATABASE Bamazon;

USE Bamazon

CREATE TABLE Products
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255),
  price INT,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
15678,
'Star Fleet Science Officer Mini Dress',
'Cosplay',
75.00,
47);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
25679,
'Crusher Tricorder',
'Accessories',
37.00,
13);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
35677,
'Enterprise D Schematics',
'Tech Manuals',
41.00,
23);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
45676,
'Rey the Scavenger',
'Cosplay',
85.00,
11);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
55675,
'Lightsaber Earrings',
'Accessories',
15.00,
71);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
65674,
'Millennium Falcon Blueprints',
'Tech Manuals',
29.00,
112);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
75673,
'Tardis Dress',
'Cosplay',
97.00,
32);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
85672,
'Leather Belt and Blaster Set - River Song',
'Accessories',
59.00,
17);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
95671,
'Map of Raxacoricofallapatorius',
'Tech Manuals',
28.00,
99);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
15670,
'Leather Jacket - Spike',
'Cosplay',
108.00,
53);