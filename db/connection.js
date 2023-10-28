const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // MySQL username:
    user: "root",
    // MySQL password:
    password: "",
    database: "employeeTracker_db"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;