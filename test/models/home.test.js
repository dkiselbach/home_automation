const Home = require('../../models/home');
const knex = require('../../data/db');

describe('users', () => {
  describe('validations', () => {
    test('creates a valid home', async () => {
      const home = await Home.query().insert({
        address_line1: '101 California',
        address_line2: 'Suite 300',
        city: 'San Francisco',
        state: 'California',
        postal_code: '94111',
        country: 'USA',
        name: "Dylan's Apartment",
      });
      const homes = await Home.query();

      expect(homes).toHaveLength(1);
    });

    test('throws a validation error', async () => {
      let errMessage;
      let homes;

      try {
        await Home.query().insert({
          address_line1: '101 California',
          address_line2: 'Suite 300',
          city: 'San Francisco',
          state: 'California',
          postal_code: '94111',
          country: 'USA',
        });
      } catch (err) {
        errMessage = err.message;
      }

      homes = await Home.query();

      expect(errMessage).toEqual("name: must have required property 'name'");
      expect(homes).toHaveLength(0);
    });
  });

  describe('associations', () => {
    beforeEach(async () => {});

    test('creates a valid home', async () => {
      const home = await Home.query().insert({
        address_line1: '101 California',
        address_line2: 'Suite 300',
        city: 'San Francisco',
        state: 'California',
        postal_code: '94111',
        country: 'USA',
        name: "Dylan's Apartment",
      });
      const homes = await Home.query();

      expect(homes).toHaveLength(1);
    });
  });
});
