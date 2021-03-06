'use strict';

var DBWrapper = require('node-dbi').DBWrapper;

var env       = require('./env.js');
var dbOptions = require('../database.json')[env];

var dbWrapper;

if (dbOptions.driver === 'sqlite3') {
  dbWrapper = new DBWrapper('sqlite3', {
    'path':dbOptions.filename
  });
} else if (dbOptions.driver === 'mysql') {
  dbWrapper = new DBWrapper('mysql', {
    'host': dbOptions.host,
    'user': dbOptions.user,
    'password': dbOptions.password,
    'database': dbOptions.database
  });
} else {
  throw(new Error('No suitable db configs found'));
}

dbWrapper.connect();

module.exports = dbWrapper;
