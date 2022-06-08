const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { userHomes } = require('../resolvers/users');

const UserType = (types) =>
  new GraphQLObjectType({
    name: 'User',
    fields: () => {
      return {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        homes: {
          type: GraphQLList(types.HomeType),
          resolve(parentValue) {
            return userHomes(parentValue.id);
          },
        },
      };
    },
  });

module.exports = UserType;
