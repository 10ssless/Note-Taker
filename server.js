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

// home screen, get all notes from db
app.get("/", function (req, res) {
    connection.query("SELECT * FROM notes;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }
        res.render("index", { notes: data });
    });
});


// add new note to db
app.post("/notes", function (req, res) {
    connection.query(`INSERT INTO notes (title,text) VALUES ( "${req.body.title}", "${req.body.text}" )`, 
    function (err, result) {
        if (err) { throw err.stack; }
        res.redirect("/")
    });
});

// delete note from db
app.get("/delete/:id",function(req,res){
    let id = req.params.id;
    connection.query(`DELETE FROM notes WHERE id = ${id}`,function(err, result){
        if (err) { throw err.stack; }
        res.redirect("/")
    })
})

// get note for user to edit
app.get("/:id",function(req,res){
    let id = req.params.id;
    connection.query(`SELECT * FROM notes WHERE id = "${id}";`,function(err,result){
        if(err) throw err.stack;
        let note_edit = result[0];
        connection.query(`SELECT * FROM notes;`, function(err,data){
            if (err) throw err.stack;
            let notes = data;
            console.log(note_edit);
            console.log(notes);
            res.render("update", {notes: notes, note_edit: note_edit });
        });
    });
})

// update note in db
app.put("/update/:id",function(req,res){
    let id = req.params.id;
    let title = req.body.title;
    let text = req.body.text;
    connection.query(`UPDATE notes SET title = "${title}", text = "${text}"  WHERE id = ${id};`, function(err, result){
        if (err) throw err.stack;
        console.log(result)

        connection.query(`SELECT * FROM notes;`, function (err, data) {
            if (err) throw err.stack;
            let notes = data;
            res.render("update", {
                notes: notes,
                note_edit: {id:null,title:null,text:null}
            });
        });
    });
})




app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});