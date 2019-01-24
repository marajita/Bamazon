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
    "select departments.department_id, departments.over_head_cost,  departments.department_name, sum(products.product_sales) as total_sales from departments left outer join products on departments.department_name = products.department_name group by departments.department_name, departments.department_id, departments.over_head_cost;",
    function(err, res) {
      if (err) throw err;

      res.forEach(function(e) {
        //console.log(e.item_id + "  " + e.product_name + " " + e.selling_price);
        itemArray = [];
        itemArray.push(e.department_id);
        itemArray.push(e.department_name);
        itemArray.push("$ " + e.over_head_cost);
        itemArray.push(e.total_sales);
        itemArray.push(e.over_head_cost - e.total_sales);
        resultArray.push(itemArray);
      });

      console.log(" ");
      console.log(
        "================= PRODUCT SALES BY DEPARTMENT =================="
      );
      console.log(" ");
      console.table(
        [
          "department_id",
          "department_name",
          "over_head_cost",
          "product_sales",
          "total_profit"
        ],
        resultArray
      );

      exitProgram();
    }
  );
}

function newDept() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department name that you would like to add?"
      },
      {
        name: "overhead",
        type: "input",
        message: "What is the overhead cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.department,
          over_head_cost: answer.overhead
        },
        function(err) {
          if (err) throw err;
          console.log("The department has been added successfully!!");
          exitProgram();
        }
      );
    });
}

function exitProgram() {
  process.exit(0);
}
