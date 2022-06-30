import bcrypt from 'bcrypt';
import User from '../../models/user';

const userCreate = async (args) => {
  const { firstName, lastName, email, password } = args;
  const hashedPassword = await bcrypt.hash(password, 10);

  return User.query().insert({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
};

export default userCreate;
