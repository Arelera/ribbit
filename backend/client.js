const { Pool } = require('pg');

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require('./config');

const client = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
module.exports = client;
