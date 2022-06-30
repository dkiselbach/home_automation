import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

const UserCreateInput = {
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

const UserUpdateInput = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
};

const UserDeleteInput = {
  id: { type: new GraphQLNonNull(GraphQLID) },
};

const UserLoginInput = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

export { UserCreateInput, UserDeleteInput, UserUpdateInput, UserLoginInput };
