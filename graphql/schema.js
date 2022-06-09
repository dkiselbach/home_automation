const graphQL = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphQL;

const { users } = require('./resolvers/users');
const { userCreate } = require('./mutations/user_create');
const { homes } = require('./resolvers/homes');

const UserTypeInject = require('./types/user');
const HomeTypeInject = require('./types/home');

const types = {};

types.UserType = UserTypeInject(types);
types.HomeType = HomeTypeInject(types);
const { UserCreateInput } = require('./types/inputs');
const { UserType, HomeType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLList(UserType),
      async resolve(parentValue, args) {
        return users();
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    userCreate: {
      type: UserType,
      args: UserCreateInput,
      async resolve(parentValue, args) {
        return userCreate(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
