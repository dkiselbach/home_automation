import User from '../../models/user';

const users = async () => User.query().orderBy('created_at', 'desc');

const userHomes = async (userId) => User.relatedQuery('homes').for(userId).orderBy('created_at', 'desc');

export { users, userHomes };
