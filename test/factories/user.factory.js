const { factory } = require('factory-girl');
const User = require('../../models/user');
const { faker } = require('@faker-js/faker');

const ObjectionAdapter = require('factory-girl-objection-adapter');
factory.setAdapter(new ObjectionAdapter());

factory.define('user', User, {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
});
