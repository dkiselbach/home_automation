const User = require('../../models/user');

const users = async () => {
  return User.query();
};

module.exports = users;
