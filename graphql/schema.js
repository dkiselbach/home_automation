const graphQL = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphQL;

const { users } = require('./resolvers/users');
const { userCreate } = require('./mutations/user_create');
const { userDelete } = require('./mutations/user_delete');
const { userLogin } = require('./mutations/user_login');
const { homes } = require('./resolvers/homes');

const UserTypeInject = require('./types/user');
const HomeTypeInject = require('./types/home');
const UserLoginTypeInject = require('./types/user_login');

const types = {};

types.UserType = UserTypeInject(types);
types.UserLoginType = UserLoginTypeInject(types);
types.HomeType = HomeTypeInject(types);
const {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
  UserLoginInput,
} = require('./types/inputs');
const { userUpdate } = require('./mutations/user_update');
const { UserType, HomeType, UserLoginType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        return users();
      },
    },
    homes: {
      type: new GraphQLList(HomeType),
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
    userDelete: {
      type: UserType,
      args: UserDeleteInput,
      async resolve(parentValue, args) {
        return userDelete(args);
      },
    },
    userUpdate: {
      type: UserType,
      args: UserUpdateInput,
      async resolve(parentValue, args) {
        return userUpdate(args);
      },
    },

    userLogin: {
      type: UserLoginType,
      args: UserLoginInput,
      async resolve(parentValue, args) {
        return userLogin(args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
