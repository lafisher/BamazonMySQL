var mysql = require('mysql');
var prompt = require('prompt');
var Table = require('cli-table');

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

	//in theory create a table for  database info IDK about this, found this idea on npm + some google fu
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

	purchase();
});

//allows user to purchase item from list. or it would if it worked
var purchase = function(){

	//create prompt
	var productInfo = {
		properties: {
			item_id:{description: ("Enter the item id for the geeky item you wish to purchase")},
			stock_quantity:{description: ("How many would you like? don't say 42, everyone thinks they're so clever")}
		},
	};

	prompt.start();

	//get responses from prompt 
	prompt.get(productInfo, function(err, res){

		//push responses to geekPurchase
		var geekPurchase = {
			item_id: res.item_id,
			quantity: res.quantity
		};
		
		//push to productPurchased
		productPurchased.push(geekPurchase);

		//connect to database 
		connection.query('SELECT * FROM Products WHERE item_id=?', productPurchased[0].item_id, function(err, res){
				if(err) console.log(err, "dang, i could have sworn you got game. that item doesn't exist.");
				
				//if purchase order is greater than stock 
				if(res[0].StockQuantity < productPurchased[0].quantity){
					console.log("some geek beat you to it! no joy.");
					connection.end();

				//if there is enough stock 
				} else if(res[0].StockQuantity >= productPurchased[0].quantity){

					console.log('');

					console.log(productPurchased[0].quantity + ' items purchased');

					console.log(res[0].product_name + ' ' + res[0].price);

					//var for purchase total 
					var saleTotal = res[0].Price * productPurchased[0].quantity;
						console.log('Total: ' + saleTotal);

					//this variable contains the newly updated stock quantity of the item purchased
					newQuantity = res[0].stock_quantity - productPurchased[0].Quantity;
			
					// connects to the mysql database products and updates the stock quantity for the item puchased
					connection.query("UPDATE Products SET stock_quantity = " + newQuantity +" WHERE item_id = " + productPurchased[0].item_id, function(err, res){
						// if(err) throw err;
						// console.log('Problem ', err);
						console.log('');
						console.log("Processing.  Thank you for shopping Bamazon-Geek!");
						console.log('');

						connection.end();
					})

				};

		})
	})

};