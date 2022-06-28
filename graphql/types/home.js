const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const { homeUsers } = require('../resolvers/homes');

const UserType = (types) =>
  new GraphQLObjectType({
    name: 'Home',
    fields: () => {
      return {
        id: { type: GraphQLString },
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
      };
    },
  });

module.exports = UserType;
