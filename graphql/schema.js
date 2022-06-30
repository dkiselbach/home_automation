import graphQL from 'graphql';
import { users } from './resolvers/users';
import userCreate from './mutations/user_create';
import userDelete from './mutations/user_delete';
import userLogin from './mutations/user_login';
import { homes } from './resolvers/homes';

import UserTypeInject from './types/user';
import HomeTypeInject from './types/home';
import UserLoginTypeInject from './types/user_login';
import { userUpdate } from './mutations/user_update';
import { UserCreateInput, UserDeleteInput, UserUpdateInput, UserLoginInput } from './types/inputs';

const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphQL;

const types = {};

types.UserType = UserTypeInject(types);
types.UserLoginType = UserLoginTypeInject(types);
types.HomeType = HomeTypeInject(types);

const { UserType, HomeType, UserLoginType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      description: 'Returns available users.',
      async resolve() {
        return users();
      },
    },
    homes: {
      type: new GraphQLList(HomeType),
      async resolve() {
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

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export { graphQLSchema };
