const { GraphQLScalarType, Kind } = require('graphql');

const ApolloMaticMixedScalar = new GraphQLScalarType({
  name: "ApolloMaticMixedScalar",
  description: "Custom scalar to handle mixed types in mongoose.",

  // Convert a JavaScript object into a JSON string for serialization
  serialize(value) {
    return JSON.stringify(value);
  },

  // Parse a JSON string into a JavaScript object
  parseValue(value) {
    // Attempt to parse the JSON string into a JavaScript object
    return JSON.parse(value);
  },

  // Parse a JSON string literal in a GraphQL query into a JavaScript object
  parseLiteral(ast) {
    // Check if the AST node is of type string
    if (ast.kind === Kind.STRING) {
      // Parse the JSON string into a JavaScript object
      return JSON.parse(ast.value);
    }
    return null; // Invalid input
  },
});

module.exports = ApolloMaticMixedScalar;
