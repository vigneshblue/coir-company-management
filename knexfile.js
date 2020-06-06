const url = require('url');
const path = require('path');
const database = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'development.sqlite'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: 'production.sqlite'
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