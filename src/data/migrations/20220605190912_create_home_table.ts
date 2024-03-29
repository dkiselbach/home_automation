const tableName = 'homes';

export const up = async (knex) => {
  await knex.schema.createTable(tableName, (tbl) => {
    tbl.increments('id').primary();
    tbl.string('addressLine1').notNullable();
    tbl.string('addressLine2');
    tbl.string('city').notNullable();
    tbl.string('state');
    tbl.string('postalCode');
    tbl.string('country');
    tbl.string('name').notNullable();
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
