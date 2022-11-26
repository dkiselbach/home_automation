import { faker } from '@faker-js/faker';
import User from '../../src/models/user.js';
import { homeAttributes } from './home.factory.js';
import bcrypt from 'bcrypt';

export const userAttributes = async () => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: await bcrypt.hash('password', 10),
});

export const createUserWithHome = async (attributes?) => {
  const baseAttributes = {
    ...(await userAttributes()),
    homes: [homeAttributes()],
  };

  return User.query().insertGraph({ ...baseAttributes, ...attributes });
};

export const createUser = async (attributes) => User.query().insert({ ...userAttributes(), ...attributes });
