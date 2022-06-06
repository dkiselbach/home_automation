exports.up = (knex) =>
  knex.schema.createTable('users', (tbl) => {
    tbl.increments('id').primary();
    tbl.string('firstName').notNullable();
    tbl.string('lastName').notNullable();
    tbl.string('email').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
