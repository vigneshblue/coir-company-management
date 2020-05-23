const database = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + "/db/development.sqlite"
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
      filename: __dirname + "/db/production.sqlite"
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/productions'
    }
  }
};
module.exports = database;