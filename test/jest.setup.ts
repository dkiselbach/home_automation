import { transaction, Model } from 'objection';
import knex from '../src/data/db.js';
import dotenv from 'dotenv';
dotenv.config();

import App from '../src/server.js';

global.beforeAll(async () => {
  global.knex = knex;
  global.txn = null;
  global.app = App;
});

global.beforeEach(async () => {
  global.txn = await transaction.start(knex);
  Model.knex(global.txn);
});

global.afterEach(async () => {
  await global.txn.rollback();
  Model.knex(knex);
});

global.afterAll(async () => {
  global.knex.destroy();
  global.app.close();
});
