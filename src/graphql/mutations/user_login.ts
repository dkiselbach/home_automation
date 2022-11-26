import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import User from '../../models/user.js';

const userByEmail = async (email) => User.query().where('email', email);

const authenticate = async (inputPassword, hashedPassword) => bcrypt.compare(inputPassword, hashedPassword);

const signedToken = (id, email) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const userLogin = async (args) => {
  const { email, password } = args;
  const [user] = await userByEmail(email);

  if (!user) throw new GraphQLError('User not found');

  if (!(await authenticate(password, user.password))) {
    throw new GraphQLError('Password is incorrect');
  }

  return {
    ...user,
    token: signedToken(user.id, user.email),
  };
};

export default userLogin;
