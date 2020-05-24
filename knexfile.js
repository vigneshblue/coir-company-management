const url = require('url');
const path = require('path');
const database = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: '/home/vigneshwaran/workspace/personal/coir-company-management/db/development.sqlite'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};
module.exports = database;