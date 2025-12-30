const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  dateStrings: true,
  timezone: '+05:30',

  waitForConnections: true,
  connectionLimit: 10,   // adjust based on traffic
  queueLimit: 0
});

module.exports = pool;

