import Home from '../../models/home.js';
import { authenticateByUser } from '../../../services/auth.js';

const homes = async (ctx) => {
  authenticateByUser(ctx);

  return Home.query().orderBy('created_at', 'desc');
};

const homeUsers = async (homeId) => Home.relatedQuery('users').for(homeId).orderBy('created_at', 'desc');

export { homes, homeUsers };
