const pg = require('pg');
const keys = require('./keys');

const pool = new pg.Pool(keys.database);

module.exports = pool;