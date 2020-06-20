require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    pool : {
      min : 2,
      max : 5
    },
    migrations: {
      tableName : "knex_migration",
      directory: './migrations',
    },
  },

  // production: {
  //   client: 'pg',
  //   connection: process.env.DB_URL,
  //   migrations: {
  //     directory: './data/migrations',
  //   },
  //   seeds: { directory: './data/seeds' },
  // },
};