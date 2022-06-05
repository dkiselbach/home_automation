exports.up = (knex) =>
  knex.schema.createTable('users', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('first_name').notNullable();
    tbl.string('last_name').notNullable();
    tbl.string('email').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
