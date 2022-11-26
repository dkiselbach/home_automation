import User from '../../models/user.js';
import { authenticateByUser } from '../../services/auth.js';

const users = async (ctx) => {
  authenticateByUser(ctx);

  return User.query().orderBy('created_at', 'desc');
};

const userHomes = async (userId) => User.relatedQuery('homes').for(userId).orderBy('created_at', 'desc');

export { users, userHomes };
