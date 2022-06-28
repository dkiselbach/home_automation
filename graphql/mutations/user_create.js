const User = require('../../models/user');
const bcrypt = require('bcrypt');

const userCreate = async (args) => {
  const { firstName, lastName, email, password } = args;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.query().insert({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });
};

module.exports = { userCreate };
