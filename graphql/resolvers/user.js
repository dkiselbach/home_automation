import { authenticateByUser } from '../../services/auth';

const user = async (ctx) => {
  authenticateByUser(ctx);

  return ctx.user;
};

export default user;
