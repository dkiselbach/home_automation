import { GraphQLObjectType, GraphQLSchema, GraphQLList } from 'graphql';
import { users } from './resolvers/users.js';
import userCreate from './mutations/user_create.js';
import userDelete from './mutations/user_delete.js';
import userLogin from './mutations/user_login.js';
import { homes } from './resolvers/homes.js';
import user from './resolvers/user.js';

import UserTypeInject from './types/user.js';
import HomeTypeInject from './types/home.js';
import UserLoginTypeInject from './types/user_login.js';
import userUpdate from './mutations/user_update.js';
import { UserCreateInput, UserDeleteInput, UserUpdateInput, UserLoginInput } from './types/inputs.js';

const types = {};

types.UserType = UserTypeInject(types);
types.UserLoginType = UserLoginTypeInject(types);
types.HomeType = HomeTypeInject(types);

const { UserType, HomeType, UserLoginType } = types;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      description: 'Returns the currently signed in user.',
      resolve: (parentValue, args, ctx) => user(ctx),
    },
    users: {
      type: new GraphQLList(UserType),
      description: 'Returns available users.',
      resolve: (parentValue, args, ctx) => users(ctx),
    },
    homes: {
      type: new GraphQLList(HomeType),
      resolve: (parentValue, args, ctx) => homes(ctx),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    userCreate: {
      type: UserType,
      args: UserCreateInput,
      resolve: (parentValue, args) => userCreate(args),
    },
    userDelete: {
      type: UserType,
      args: UserDeleteInput,
      resolve: (parentValue, args, ctx) => userDelete(args, ctx),
    },
    userUpdate: {
      type: UserType,
      args: UserUpdateInput,
      resolve: (parentValue, args, ctx) => userUpdate(args, ctx),
    },

    userLogin: {
      type: UserLoginType,
      args: UserLoginInput,
      resolve: (parentValue, args) => userLogin(args),
    },
  },
});

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export { graphQLSchema };
