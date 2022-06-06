const User = require('../../models/user');
const { faker } = require('@faker-js/faker');
const { homeAttributes } = require('./home.factory');

const userAttributes = {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
};

const createUserWithHome = async (attributes) => {
  const baseAttributes = {
    ...userAttributes,
    homes: [homeAttributes],
  };

  return User.query().insertGraph({ ...baseAttributes, ...attributes });
};

const createUser = async (attributes) => {
  return User.query().insert({ ...userAttributes, ...attributes });
};

module.exports = { createUserWithHome, createUser, userAttributes };
