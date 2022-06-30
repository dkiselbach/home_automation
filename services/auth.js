import jwt from 'jsonwebtoken';
import User from '../models/user';

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

const authenticate = (token) => {
  try {
    return verifyToken(token);
  } catch (e) {
    return null;
  }
};

export default authenticate;
