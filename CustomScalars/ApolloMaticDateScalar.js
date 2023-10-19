const { GraphQLScalarType, Kind } = require('graphql');

const ApolloMaticDateScalar = new GraphQLScalarType({
  //Note that the ast that is contructed by the GraphQL query can tell that a node is a variable or a literal by their structure. Variables are an object with a name and value property and literals only have the value property.
  name: 'ApolloMaticDateScalar',
  description: 'Custom scalar for handling dates in ApolloMatic',
  serialize(value) {
    //Convert date to String to be sent back to the client.
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);//coverts
  },
  //When the AST is being traversed, if this scalar type is found and the value is a literal, this functionality will be run.
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) { //checks if the value is a string
      return new Date(ast.value);//converts the string to a Date object,
    }
    return null;
  },
});

module.exports = ApolloMaticDateScalar;