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
  start();
});

function start() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do from the below menu?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menu === "View Products for Sale") {
        viewProductsForSale();
      } else if (answer.menu === "View Low Inventory") {
        lowInventory();
      } else if (answer.menu === "Add to Inventory") {
        addInventory();
      } else if (answer.menu === "Add New Product") {
        addNewProduct();
      } else {
        connection.end();
      }
    });
}

function viewProductsForSale() {
  resultArray = [];
  connection.query(
    "SELECT item_id, product_name, selling_price, stock_quantity FROM products",
    function(err, res) {
      if (err) throw err;
      res.forEach(function(e) {
        //console.log(e.item_id + "  " + e.product_name + " " + e.selling_price);
        itemArray = [];
        itemArray.push(e.item_id);
        itemArray.push(e.product_name);
        itemArray.push("$ " + e.selling_price);
        itemArray.push(e.stock_quantity);
        resultArray.push(itemArray);
      });
      console.log(" ");
      console.log("=========== ITEMS AVAILABLE FOR SALE =============");
      console.log(" ");
      console.table(
        ["Item ID", "Product Name", "Selling Price", "Stock Quantity"],
        resultArray
      );
      exitProgram();
    }
  );
}

function lowInventory() {
  resultArray = [];
  connection.query(
    "SELECT item_id, product_name, selling_price, stock_quantity FROM products WHERE stock_quantity <  5",
    function(err, res) {
      if (err) throw err;
      res.forEach(function(e) {
        //console.log(e.item_id + "  " + e.product_name + " " + e.selling_price);
        itemArray = [];
        itemArray.push(e.item_id);
        itemArray.push(e.product_name);
        itemArray.push("$ " + e.selling_price);
        itemArray.push(e.stock_quantity);
        resultArray.push(itemArray);
      });
      console.log(" ");
      console.log(
        "=========== ITEMS LOW IN STOCK (Less than 5 in quantity) ============="
      );
      console.log(" ");
      console.table(
        ["Item ID", "Product Name", "Selling Price", "Stock Quantity"],
        resultArray
      );
      exitProgram();
    }
  );
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message:
          "Please enter the  ID of the product that you would like to add."
      },
      {
        name: "quantity",
        type: "input",
        message: "How much stock quantity you would like to add: "
      }
    ])
    .then(function(answer) {
      var quantityAdded = answer.quantity;
      console.log(answer.id);
      connection.query(
        "SELECT stock_quantity, product_name FROM products WHERE ?",
        {
          item_id: answer.id
        },
        function(err, res) {
          if (err) throw err;
          var quantityFromDB = res[0].stock_quantity;
          var productNameFromDB = res[0].product_name;
          var updateQuantity =
            parseInt(quantityFromDB) + parseInt(quantityAdded);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updateQuantity
              },
              {
                item_id: answer.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log(" ");
              console.log("========== Stock addded successfully ==========");
              console.log("Item name : " + productNameFromDB);
              console.log(" Total quantity : " + updateQuantity);
              console.log(" ");
              exitProgram();
            }
          );
        }
      );
    });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What is the product name you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "Which department you would like to add the product to?"
      },
      {
        name: "sp",
        type: "input",
        message: "What will the selling price of the product?"
      },
      {
        name: "stock",
        type: "input",
        message: "What is the stock quantity?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          selling_price: answer.sp,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("The item has been added successfully!!");
          exitProgram();
        }
      );
    });
}

function exitProgram() {
  process.exit(0);
}
