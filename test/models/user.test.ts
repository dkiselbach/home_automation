import User from '../../src/models/user.js';
import { createUser, createUserWithHome } from '../factories/user.factory.js';
import { createHomeWithUser } from '../factories/home.factory.js';
import Home from '../../src/models/home.js';

describe('users', () => {
  describe('validations', () => {
    test('creates a valid user', async () => {
      await createUser({ firstName: 'Dylan' });

      const users = await User.query();

      expect(users).toHaveLength(1);
      expect(users[0].firstName).toEqual('Dylan');
    });

    test('throws a validation error', async () => {
      let errorMessage;
      let users;

      try {
        await createUser({ email: undefined });
      } catch (err) {
        errorMessage = err.message;
      }

      users = await User.query();

      expect(errorMessage).toEqual("email: must have required property 'email'");
      expect(users).toHaveLength(0);
    });
  });

  describe('associations', () => {
    let results;

    beforeEach(async () => {
      results = await createUserWithHome();
    });

    test('returns associated homes', async () => {
      const homes = await User.relatedQuery('homes').for(results.id);

      expect(homes).toHaveLength(1);
    });
  });
});
