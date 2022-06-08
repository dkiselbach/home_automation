const graphQL = require('graphql');
const usersResolver = require('./resolvers/users');
const { homes } = require('./resolvers/homes');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphQL;

const UserTypeInject = require('./types/user');
const HomeTypeInject = require('./types/home');

const types = {};

types.UserType = UserTypeInject(types);
types.HomeType = HomeTypeInject(types);

const { UserType, HomeType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLList(UserType),
      async resolve(parentValue, args) {
        return usersResolver();
      },
    },
    homes: {
      type: GraphQLList(HomeType),
      async resolve(parentValue, args) {
        return homes();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
