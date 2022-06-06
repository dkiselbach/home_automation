const graphQL = require('graphql');
const usersResolver = require('./resolvers/users');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } =
  graphQL;

const UserTypeInject = require('./types/user');

const types = {};

types.UserType = UserTypeInject(types);

const { UserType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLList(UserType),
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return usersResolver();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
