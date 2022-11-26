import pkg from 'knex';
const { knex } = pkg;

import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
