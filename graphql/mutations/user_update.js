import User from '../../models/user';

const userUpdate = async (args) => {
  const { id } = args;

  return User.query().patchAndFetchById(id, args);
};

export { userUpdate };
