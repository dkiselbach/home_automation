import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';

import { userHomes } from '../resolvers/users.js';

const UserLoginType = (types) =>
  new GraphQLObjectType({
    name: 'UserLogin',
    fields: () => ({
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      token: { type: GraphQLString },
      homes: {
        type: new GraphQLList(types.HomeType),
        resolve(parentValue) {
          return userHomes(parentValue.id);
        },
      },
    }),
  });

export default UserLoginType;
