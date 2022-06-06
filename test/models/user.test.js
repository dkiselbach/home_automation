const User = require('../../models/user');
const { createUser, createUserWithHome } = require('../factories/user.factory');
const { createHomeWithUser } = require('../factories/home.factory');
const Home = require('../../models/home');

describe('users', () => {
  describe('validations', () => {
    test('creates a valid user', async () => {
      await createUser({ first_name: 'Dylan' });

      const users = await User.query();

      expect(users).toHaveLength(1);
      expect(users[0].first_name).toEqual('Dylan');
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

      expect(errorMessage).toEqual(
        "email: must have required property 'email'",
      );
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
