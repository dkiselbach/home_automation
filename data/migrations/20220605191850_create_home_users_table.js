const tableName = 'home_users';

exports.up = async (knex) => {
  await knex.schema.createTable(tableName, (tbl) => {
    tbl.increments('id').primary();
    tbl.integer('home_id').references('id').inTable('homes').index();
    tbl.integer('user_id').references('id').inTable('users').index();
    tbl.timestamps(false, true, true);
  });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => knex.schema.dropTableIfExists(tableName);
