import { faker } from '@faker-js/faker';
import User from '../../src/models/user';
import { homeAttributes } from './home.factory';

export const userAttributes = () => ({
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
});

export const createUserWithHome = async (attributes) => {
  const baseAttributes = {
    ...userAttributes(),
    homes: [homeAttributes()],
  };

  return User.query().insertGraph({ ...baseAttributes, ...attributes });
};

export const createUser = async (attributes) => User.query().insert({ ...userAttributes(), ...attributes });
