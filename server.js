var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
require("dotenv").config();

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.LOCAL_SERVER_PSWD,
    database: "note_taker_db"
});

connection.connect(function (err) {
    if (err) throw err.stack;
    console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
    connection.query("SELECT * FROM notes;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.render("index", { notes: data });
    });
});

app.post("/api/notes", function (req, res) {
    connection.query(`INSERT INTO notes (title,text) VALUES ( "${req.body.title}", "${req.body.text}" )`, 
    function (err, result) {
        if (err) { throw err.stack; }
        res.redirect("/")
    });
});

app.get("/api/delete/:id",function(req,res){
    let id = req.params.id;
    connection.query(`DELETE FROM notes WHERE id = ${id}`,function(err, result){
        if (err) { throw err.stack; }
        res.redirect("/")
    })
})






app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});