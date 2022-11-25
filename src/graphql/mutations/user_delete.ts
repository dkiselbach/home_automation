import User from '../../models/user.js';
import { validateAccessByUserID } from '../../services/auth.js';

const userDelete = async (args, ctx) => {
  const { id } = args;

  validateAccessByUserID(id, ctx);

  const result = await User.query().deleteById(id).returning('*');
  if (result) {
    return result;
  }
  throw new Error(`User with id ${id} was not found`);
};

export default userDelete;
