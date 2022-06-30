import User from '../../models/user';

const userDelete = async (args) => {
  const { id } = args;

  const result = await User.query().deleteById(id).returning('*');
  if (result) {
    return result;
  }
  throw new Error(`User with id ${id} was not found`);
};

export default userDelete;
