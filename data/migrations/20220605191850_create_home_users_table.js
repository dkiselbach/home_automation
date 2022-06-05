exports.up = (knex) =>
  knex.schema.createTable('home_users', (tbl) => {
    tbl.increments('id').primary();

    tbl.integer('home_id').references('id').inTable('homes').index();
    tbl.integer('user_id').references('id').inTable('users').index();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('home_users');
