const { GraphQLScalarType, Kind } = require('graphql');

const ApolloMaticMapScalar = new GraphQLScalarType({
  name: 'ApolloMaticMapScalar',
  description: 'Scalar to handle mixed types in mongoose',
    serialize(value) {
    // Convert the Map object to JSON for sending it to the client
    return JSON.stringify(value);
  },
  parseValue(value) {
    // Parse the value from the client (as JSON)
    return JSON.parse(value);
  },
  //This doesn't account for nested maps yet (use recursion)
  parseLiteral(ast) {
    // Parse the AST value received from the client
    if (ast.kind === Kind.OBJECT) {
      const obj = {};
      ast.fields.forEach(field => {
        obj[field.name.value] = field.value.value;
      });
      return obj;
    }
    return null; // Invalid input
  },
});

module.exports = ApolloMaticMapScalar;
