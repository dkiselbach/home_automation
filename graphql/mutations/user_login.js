const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

const userLogin = async (args) => {
  const { email, password } = args;
  console.log(email);
  let user = await User.query().where('email', email);
  user = user[0];
  console.log(user);
  const hashedPassword = user.password;

  const authenticated = await bcrypt.compare(password, hashedPassword);

  if (!authenticated) {
    console.log(user);

    throw new GraphQLError('User or password is incorrect');
  }

  console.log(user.id, user.email);

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );

  console.log(user);

  return {
    ...user,
    token: token,
  };
};

module.exports = { userLogin };
