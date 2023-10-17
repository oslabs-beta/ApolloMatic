const { GraphQLScalarType, Kind, GraphQLError } = require('graphql');

const ApolloMaticBufferScalar = new GraphQLScalarType({
  name: 'ApolloMaticBufferScalar',
  description: 'A custom scalar type for handling Buffer data type.',
  serialize(value) {

    // Convert Buffer value to a string in base 64. This can be transmitted much more efficiently
    return value.toString('base64');
  },
  parseValue(value) {
    //After the server receives the value, it needs to convert it to a Buffer object.
    return Buffer.from(value);
  },
  parseLiteral(ast) {
    //if the query/mutation is made with a literal value, then parseLiteral will be invoked on the AST node that isof this type scalar. The literal 
    //value is used to create a buffer object, to be used by 
    if (ast.kind === Kind.STRING) {
      return Buffer.from(ast.value, 'base64');
    }
    return null; // will return null if the ast.kind is not a string
  },
});

module.exports = ApolloMaticBufferScalar;


//Add to documentation:
/*
  Server side:

  Client side:
    Once the user receives a stringified object from the request and they want to access this data they will have to...
      1. Use the JSON.parse function on the stringified object in order to convert the data from a string to a javascript object. 
      2. Use the atob() function in order to convert the ASCII base64 string back to binary.
      

*/
