import dotenv from 'dotenv';
require('ts-node/register');

dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/home_automation',
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  test: {
    client: 'pg',
    connection: 'postgresql://localhost/home_automation_test',
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },
};
