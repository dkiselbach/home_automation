exports.up = (knex) =>
  knex.schema.createTable('homes', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('addressLine1').notNullable();
    tbl.string('addressLine2');
    tbl.string('city').notNullable();
    tbl.string('state');
    tbl.string('postalCode');
    tbl.string('country');
    tbl.string('name').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('homes');
