import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

const authenticateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
};

const authenticateByUser = (ctx) => {
  if (ctx.user?.id) return;

  throw new GraphQLError('User authentication error');
};

const validateAccessByUserID = (userId, ctx) => {
  if (ctx.user?.id === Number(userId)) return;

  throw new GraphQLError('User authentication error');
};

export { authenticateToken, authenticateByUser, validateAccessByUserID };
