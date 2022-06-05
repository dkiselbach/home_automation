const User = require('../../models/user');

describe('users', () => {
  test('creates a valid user', async () => {
    const user = await User.query().insert({
      first_name: 'Dylan',
      last_name: 'Kiselbach',
      email: 'dylankiselbach@test.com',
    });
    const users = await User.query();

    expect(users).toHaveLength(1);
  });

  test('throws a validation error', async () => {
    try {
      const user = await User.query().insert({
        first_name: 'Dylan',
        last_name: 'Kiselbach',
      });
    } catch (err) {
      expect(err.message).toEqual("email: must have required property 'email'");
    }

    const users = await User.query();

    expect(users).toHaveLength(0);
  });
});
