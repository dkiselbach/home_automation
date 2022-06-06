const Home = require('../../models/home');
const { createHome, createHomeWithUser } = require('../factories/home.factory');

describe('users', () => {
  describe('validations', () => {
    test('creates a valid home', async () => {
      await createHome({ addressLine1: '101 California' });

      const homes = await Home.query();

      expect(homes).toHaveLength(1);
      expect(homes[0].addressLine1).toEqual('101 California');
    });

    test('throws a validation error', async () => {
      let errMessage;
      let homes;

      try {
        await createHome({ name: undefined });
      } catch (err) {
        errMessage = err.message;
      }

      homes = await Home.query();

      expect(errMessage).toEqual("name: must have required property 'name'");
      expect(homes).toHaveLength(0);
    });
  });

  describe('associations', () => {
    let results;

    beforeEach(async () => {
      results = await createHomeWithUser();
    });

    test('returns associated users', async () => {
      const users = await Home.relatedQuery('users').for(results.id);

      expect(users).toHaveLength(1);
    });
  });
});
