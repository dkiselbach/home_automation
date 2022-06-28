const User = require('../../models/user');

const users = async () => {
  return User.query().orderBy('created_at', 'desc');
};

const userHomes = async (user_id) => {
  return User.relatedQuery('homes').for(user_id).orderBy('created_at', 'desc');
};

module.exports = { users, userHomes };
