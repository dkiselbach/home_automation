const User = require('../../models/user');

const userCreate = async (args) => {
  const { firstName, lastName, email } = args;

  return User.query().insert({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
};

module.exports = { userCreate };
