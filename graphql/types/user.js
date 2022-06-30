import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

import { userHomes } from '../resolvers/users';

const UserType = (types) =>
  new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      homes: {
        type: new GraphQLList(types.HomeType),
        resolve(parentValue) {
          return userHomes(parentValue.id);
        },
      },
    }),
  });

export default UserType;
