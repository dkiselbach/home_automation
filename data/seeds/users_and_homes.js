exports.seed = async function (knex) {
  await knex('users').del();
  await knex('homes').del();
  await knex('home_users').del();
  await knex('users').insert([
    { id: 1, first_name: 'Test', last_name: 'User', email: 'test@gmail.com' },
  ]);
  await knex('homes').insert([
    {
      id: 1,
      name: 'Test House',
      address_line1: '101 California',
      city: 'San Francisco',
    },
  ]);
  await knex('home_users').insert([
    {
      id: 1,
      user_id: 1,
      home_id: 1,
    },
  ]);
};
