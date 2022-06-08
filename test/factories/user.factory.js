const User = require('../../models/user');
const { faker } = require('@faker-js/faker');
const { homeAttributes } = require('./home.factory');

const userAttributes = () => {
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
};

const createUserWithHome = async (attributes) => {
  const baseAttributes = {
    ...userAttributes(),
    homes: [homeAttributes()],
  };

  return User.query().insertGraph({ ...baseAttributes, ...attributes });
};

const createUser = async (attributes) => {
  return User.query().insert({ ...userAttributes(), ...attributes });
};

module.exports = { createUserWithHome, createUser, userAttributes };
