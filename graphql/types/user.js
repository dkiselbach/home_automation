const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = (types) =>
  new GraphQLObjectType({
    name: 'User',
    fields: () => {
      console.log(types.UserType);
      return {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        // posts: {
        //   type: GraphQLList(types.PostType),
        //   resolve(parentValue) {
        //     return postsResolver(parentValue.id);
        //   },
        // },
      };
    },
  });

module.exports = UserType;
