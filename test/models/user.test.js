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
    let errMessage;
    let users;

    try {
      await User.query().insert({
        first_name: 'Dylan',
        last_name: 'Kiselbach',
      });
    } catch (err) {
      errMessage = err.message;
    }

    users = await User.query();

    expect(errMessage).toEqual("email: must have required property 'email'");
    expect(users).toHaveLength(0);
  });
});
