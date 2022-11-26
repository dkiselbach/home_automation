import { faker } from '@faker-js/faker';
import Home from '../../src/models/home.js';
import { userAttributes } from './user.factory.js';

export const homeAttributes = () => ({
  addressLine1: faker.address.streetAddress(),
  addressLine2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  postalCode: faker.address.zipCode(),
  country: faker.address.country(),
  name: faker.name.firstName(),
});

export const createHomeWithUser = async (attributes?) => {
  const baseAttributes = {
    ...homeAttributes(),
    users: [userAttributes()],
  };

  return Home.query().insertGraph({ ...baseAttributes, ...attributes });
};

export const createHome = async (attributes) => Home.query().insert({ ...homeAttributes(), ...attributes });
