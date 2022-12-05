import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'dkiselbach',
      password : 'password',
      database : 'home_automation'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  test: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'dkiselbach',
      password : 'password',
      database : 'home_automation_test'
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './seeds' },
  },
};
