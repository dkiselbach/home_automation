const Home = require('../../models/home');
const { faker } = require('@faker-js/faker');
const { userAttributes } = require('./user.factory');

const homeAttributes = () => {
  return {
    addressLine1: faker.address.streetAddress(),
    addressLine2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country(),
    name: faker.name.firstName(),
  };
};

const createHomeWithUser = async (attributes) => {
  const baseAttributes = {
    ...homeAttributes(),
    users: [userAttributes()],
  };

  return Home.query().insertGraph({ ...baseAttributes, ...attributes });
};

const createHome = async (attributes) => {
  return Home.query().insert({ ...homeAttributes(), ...attributes });
};

module.exports = { createHomeWithUser, createHome, homeAttributes };
