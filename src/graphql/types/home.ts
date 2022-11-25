import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import { homeUsers } from '../resolvers/homes.js';

const UserType = (types) =>
  new GraphQLObjectType({
    name: 'Home',
    fields: () => ({
      id: { type: GraphQLID },
      addressLine1: { type: GraphQLString },
      addressLine2: { type: GraphQLString },
      city: { type: GraphQLString },
      state: { type: GraphQLString },
      postalCode: { type: GraphQLString },
      country: { type: GraphQLString },
      name: { type: GraphQLString },
      users: {
        type: new GraphQLList(types.UserType),
        resolve(parentValue) {
          return homeUsers(parentValue.id);
        },
      },
    }),
  });

export default UserType;
