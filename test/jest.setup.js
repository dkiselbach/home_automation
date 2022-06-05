const objection = require('objection');
const knex = require('../data/db'); // Change src/db/index.js to the path to the file where you export your knex instance

const { transaction, Model } = objection;

global.beforeAll(async () => {
  global.knex = knex;
  global.txn = null;
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
});
