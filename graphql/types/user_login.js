const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { userHomes } = require('../resolvers/users');

const UserLoginType = (types) =>
  new GraphQLObjectType({
    name: 'UserLogin',
    fields: () => {
      return {
        id: { type: GraphQLString },
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
      };
    },
  });

module.exports = UserLoginType;
