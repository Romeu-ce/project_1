const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'sport_school',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;

