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
  listMenu();
});

function listMenu() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do from the below menu?",
      choices: ["View Product Sales by Department", "Create New Department"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menu === "View Product Sales by Department") {
        productSalesByDept();
      } else if (answer.menu === "Create New Department") {
        newDept();
      } else {
        connection.end();
      }
    });
}

function productSalesByDept() {
  resultArray = [];
  connection.query(
    "select departments.department_id, departments.over_head_cost,  departments.department_name, sum(products.product_sales) as total_sales from departments inner join products on departments.department_name = products.department_name group by departments.department_name, departments.department_id, departments.over_head_cost;",
    function(err, res) {
      if (err) throw err;
      res.forEach(function(e) {
        //console.log(e.item_id + "  " + e.product_name + " " + e.selling_price);
        itemArray = [];
        itemArray.push(e.department_id);
        itemArray.push(e.over_head_cost);
        itemArray.push("$ " + e.department_name);
        resultArray.push(itemArray);
      });
      console.log(" ");
      console.log("=========== PRODUCT SALES BY DEPARTMENT =============");
      console.log(" ");
      console.table(
        ["department_id", "over_head_cost", "department_name"],
        resultArray
      );
    }
  );
}

function newDept() {}
