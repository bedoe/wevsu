var express = require("express");
var ejs = require("ejs");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

var conn = mysql.createConnection({
  host: process.env.OPENSHIFT_MYSQL_DB_HOST,
  user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
  password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
  port: process.env.OPENSHIFT_MYSQL_DB_PORT,
  database: process.env.OPENSHIFT_APP_NAME
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
  //   conn.query(
  //     "SELECT * FROM giftapp where name= ?",
  //     details.charAt(0).toUpperCase() + details.slice(1),
  //     (err, rs) => {
  //       console.log(rs[0].name);
  //       res.render("success", { myR: rs[0] });
  //     }
  //   );

  var rs = {
    name: "Kylie",
    fav_img: "https://i.ibb.co/yB7gT33/20190830-003750.jpg",
    paragraph:
      "I really have lots of stuff to tell you, mainly about how adorable you are, how nice you are while talking to me. But it is getting late here, the styling really took hell of time!!! But I will try to open the database later and change this paragpraph. So, make sure to check out here once a day for more changes!!! Lots of love, Badawi!"
  };
  res.render("success", { myR: rs });
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8443;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

app.listen(port, ip_address, () => {
  console.log("Server listening on port 8080");
});
