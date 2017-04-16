var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'Bamazon', 
});

var productPurchased = [];

connection.connect();

//connect to database and pull products for display 
connection.query('SELECT item_id, product_name, price FROM Products', function(err, result){
	if(err) console.log("Whoops! something went wrong.");

//create table	
	var table = new Table({
		head: ['Item Id#', 'Product Name', 'Price'],
		style: {
			compact: false,
			colAligns: ['center'],
		}
	});

	//loops through Products database 
	for(var i = 0; i < result.length; i++){
		table.push(
			[result[i].item_id, result[i].product_name, result[i].price]
		);
	}
	console.log(table.toString());

	buyGeek();
});

//Prompts customer to buy Geek 
    var buyGeek = function() {
        inquirer.prompt([{
            name: "Item",
            type: "input",
            message: "Enter the item id for the geeky item you wish to purchase",
            validate: function(value) {

                //Validate answer
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nPlease enter only the item ID of the item you'd like to buy\n");
                    return false;
                }
            }
        },

            //customer enter quantity 
            {
            name: "Qty",
            type: "input",
            message: "How many would you like? don't say 42, everyone thinks they're so clever",
            validate: function(value) {
                //validates answer
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nsomething went wrong, try again!\n");
                    return false;
                }
            }
        }]).then(function(answer) {
            var geekPurchase = parseInt(answer.Qty);

            //send query to database
            connection.query("SELECT * FROM Products WHERE ?", [{item_id: answer.Item}], function(err, data) {
                if (err) throw err;

                //Check if quantity exists
                if (data[0].stock_quantity < geekPurchase) {
                    console.log("some geek beat you to it! no joy.\n");
                    console.log("Choose another geek product\n");
                    start();
                } else {

                    //If quantity matches update database
                    var updateQty = data[0].stock_quantity - geekPurchase;
                    var totalPrice = data[0].price * geekPurchase;
                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [updateQty, answer.Item], function(err, results) {
                        if(err) {
                            throw err;
                        } else {
                            console.log("Geek purchase complete!\n");
                            console.log("Your total cost is: $ " + totalPrice);

                            //Ask buyer to continue
                            inquirer.prompt({
                                name: "buyMore",
                                type: "confirm",
                                message: "Would you like to buy more geek products?",
                            }).then(function(answer) {
                                if (answer.buyMore === true) {
                                    start();
                                } else {
                                    console.log("Processing.  Thank you for shopping Bamazon-Geek!");
                                    connection.end();
                                }
                            });
                        }
                    });
                }
            });
        });
    };