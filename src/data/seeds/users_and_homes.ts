import bcrypt from 'bcrypt';

export const seed = async (knex) => {
  await knex('home_users').del();
  await knex('users').del();
  await knex('homes').del();
  await knex('users').insert([
    {
      id: 1,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@gmail.com',
      password: await bcrypt.hash('password', 10),
    },
  ]);
  await knex('homes').insert([
    {
      id: 1,
      name: 'Test House',
      addressLine1: '101 California',
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
