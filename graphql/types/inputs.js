const { GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const UserCreateInput = {
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
};

const UserUpdateInput = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  firstName: { type: GraphQLString },
  lastName: { type: GraphQLString },
};

const UserDeleteInput = {
  id: { type: new GraphQLNonNull(GraphQLID) },
};

module.exports = { UserCreateInput, UserDeleteInput, UserUpdateInput };
