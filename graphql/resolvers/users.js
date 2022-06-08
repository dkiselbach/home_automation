const User = require('../../models/user');

const users = async () => {
  return User.query().orderBy('createdAt', 'desc');
};

const userHomes = async (user_id) => {
  return User.relatedQuery('homes').for(user_id).orderBy('createdAt', 'desc');
};

module.exports = { users, userHomes };
