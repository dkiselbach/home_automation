import User from '../../models/user.js';
import { validateAccessByUserID } from '../../../services/auth.js';

const userUpdate = async (args, ctx) => {
  const { id, firstName, lastName } = args;

  validateAccessByUserID(id, ctx);

  return User.query().patchAndFetchById(id, { firstName, lastName });
};

export default userUpdate;
