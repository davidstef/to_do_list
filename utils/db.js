const pgp = require('pg-promise')();
const { CONNECTION_STRING } = require('../config')
const db = pgp(CONNECTION_STRING);
module.exports = db