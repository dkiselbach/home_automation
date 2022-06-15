const User = require('../../models/user');

const userUpdate = async (args) => {
  const { id } = args;
  delete args.id;

  return User.query().patchAndFetchById(id, args);
};

module.exports = { userUpdate };
