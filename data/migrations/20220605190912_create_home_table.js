exports.up = (knex) =>
  knex.schema.createTable('homes', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('address_line_1').notNullable();
    tbl.text('address_line_2', 128);
    tbl.text('city', 128).notNullable();
    tbl.text('state', 128).notNullable();
    tbl.text('postal_code', 128).notNullable();
    tbl.text('country', 128).notNullable();
    tbl.text('name', 128).notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('homes');
