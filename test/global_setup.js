const knex = require('knex');

const database = 'test_home_automation_database';

// Create the database
async function createTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      /* connection info without database */
    },
  });

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
    await knex.raw(`CREATE DATABASE ${database}`);
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: {
      /* connection info with database */
    },
  });

  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (error) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log('Test database created successfully');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
