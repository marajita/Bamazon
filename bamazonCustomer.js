var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
// 1. creating connection

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  displayAllProducts();
});

function displayAllProducts() {
  resultArray = [];
  connection.query(
    "SELECT item_id, product_name, selling_price FROM products",
    function(err, res) {
      if (err) throw err;
      res.forEach(function(e) {
        //console.log(e.item_id + "  " + e.product_name + " " + e.selling_price);
        itemArray = [];
        itemArray.push(e.item_id);
        itemArray.push(e.product_name);
        itemArray.push("$ " + e.selling_price);
        resultArray.push(itemArray);
      });
      console.log(" ");
      console.log("=========== ITEMS AVAILABLE FOR SALE =============");
      console.log(" ");
      console.table(["Item ID", "Product Name", "Selling Price"], resultArray);

      //connection.end();
      //idInput();
      // quantityInput();
      userInput();
    }
  );
}

function userInput() {
  inquirer
    .prompt([
      {
        name: "product_id",
        type: "input",
        message:
          "Please enter the  ID of the product that you would like to buy."
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to buy?."
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      //console.log(answer);
      var inputQuantity = answer.quantity;

      connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        {
          item_id: answer.product_id
        },
        function(err, res) {
          if (err) throw err;
          //console.log(JSON.stringify(res));
          //console.log(res[0].stock_quantity);
          var quantityFromDB = res[0].stock_quantity;
          if (inputQuantity > quantityFromDB) {
            console.log("Insufficient quantity!");
          } else {
            var updateDB = quantityFromDB - inputQuantity;
            //console.log(updateDB);
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: updateDB
                },
                {
                  item_id: answer.product_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log(" ");
                console.log("Order placed successfully!");
                console.log(" ");

                //purchaseSummary();
                connection.query(
                  "SELECT selling_price, product_name, product_sales FROM products WHERE ?",
                  [
                    {
                      item_id: answer.product_id
                    }
                  ],
                  function(err, res) {
                    if (err) throw err;
                    //console.log(res[0].selling_price);
                    var spFromDB = res[0].selling_price;
                    var productNameFromDB = res[0].product_name;
                    var totalPrice = spFromDB * inputQuantity;
                    var sales = totalPrice;
                    console.log("======= Your order summary!! ========");
                    console.log(" ");
                    console.log("Item : " + productNameFromDB);
                    console.log("Quantity : " + inputQuantity);
                    console.log("Total Price : $" + totalPrice);
                    console.log("Product Sales Updated : $" + sales);
                    console.log(" ");
                    //update product sales
                    connection.query(
                      "UPDATE products SET ? WHERE ?",
                      [
                        {
                          product_sales: sales
                        },
                        {
                          item_id: answer.product_id
                        }
                      ],
                      function(err) {
                        if (err) throw err;
                        exitProgram();
                      }
                    );
                  }
                );
                //end
              }
            );
          }
        }
      );
    });
}

function exitProgram() {
  process.exit(0);
}

//function purchaseSummary() {}
