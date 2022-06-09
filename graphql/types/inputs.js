const { GraphQLString, GraphQLNonNull } = require('graphql');

const UserCreateInput = {
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
};

module.exports = { UserCreateInput };
