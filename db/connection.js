var mysql = require("mysql");
require("dotenv").config();

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "zj2x67aktl2o6q2n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "j0lds833k1ipx6li",
        password: process.env.LOCAL_SERVER_PSWD, // add your local password here.
        database: "a2ndx51k4k5ss45i" // add your db name here
    });
}

connection.config.typeCast = function (field, next) {
    if (field.type == "TINY" && field.length == 1) {
        return field.string() == "1"; // 1 = true, 0 = false
    }
    return next();
};


module.exports = connection;