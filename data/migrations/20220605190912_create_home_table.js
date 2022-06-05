exports.up = (knex) =>
  knex.schema.createTable('homes', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('address_line1').notNullable();
    tbl.string('address_line2');
    tbl.string('city').notNullable();
    tbl.string('state');
    tbl.string('postal_code');
    tbl.string('country');
    tbl.string('name').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('homes');
