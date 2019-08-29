var express = require("express");
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bedoe.04",
  database: "giftapp"
});

conn.connect(err => {
  if (err) {
    console.log(err);
  }
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/greeting", (req, res) => {
  res.render("hi");
});

app.post("/greet", (req, res) => {
  console.log(req.ip);
  res.redirect("/greeting");
});

app.post("/about", (req, res) => {
  var details = req.body.details;
  conn.query(
    "SELECT * FROM giftapp where name= ?",
    details.charAt(0).toUpperCase() + details.slice(1),
    (err, rs) => {
      console.log(rs[0].name);
      res.render("success", { myR: rs[0] });
    }
  );
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
