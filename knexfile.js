require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/home_automation',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  test: {
    client: 'pg',
    connection: 'postgresql://localhost/home_automation_test',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
