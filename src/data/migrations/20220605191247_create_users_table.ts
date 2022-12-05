const tableName = 'users';

export const up = async (knex) => {
  await knex.schema.createTable(tableName, (tbl) => {
    tbl.increments('id').primary();
    tbl.string('firstName').notNullable();
    tbl.string('lastName').notNullable();
    tbl.string('email').notNullable();
    tbl.string('password').notNullable();
    tbl.timestamps(false, true);
  });

  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

export const down = (knex) => knex.schema.dropTableIfExists(tableName);
