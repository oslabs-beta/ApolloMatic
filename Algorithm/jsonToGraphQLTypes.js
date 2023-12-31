const jsonToGraphQLTypes = (jsonObj) => {
  let typeQuery = 'type Query {\n';
  let typeMutation = 'type Mutation {\n';
  let typeDefs = '';
  let typeInputs = '';
  
  jsonObj.models.forEach((model) => {
      const typeName = model.name;
      let typeDef = `type ${typeName} {\n  id: ID!\n`;
      let typeInput = `input ${typeName}Input {\n`;

      // Generate Query Type Definitions
      typeQuery += `  ${typeName.toLowerCase()}(id: ID!): ${typeName}\n`;
      typeQuery += `  ${typeName.toLowerCase()}s: [${typeName}]\n`;

      // Generate Mutation Type Definitions
      typeMutation += `  add${typeName}(input: ${typeName}Input!): ${typeName}\n`;
      typeMutation += `  update${typeName}(id: ID!, input: ${typeName}Input!): ${typeName}\n`;
      typeMutation += `  delete${typeName}(id: ID!): ${typeName}\n`;

      // Generate Type Definitions
      for (const [key, value] of Object.entries(model.schema)) {
          typeDef += `  ${key}: ${value}\n`;
          typeInput += `  ${key}: ${value}\n`;
      }
      typeDef += '}\n\n';
      typeDefs += typeDef;
      typeInput += '}\n\n';
      typeInputs += typeInput;
  });

  // Close the Query and Mutation types
  typeQuery += '}\n\n';
  typeMutation += '}\n\n';

  // return `const typeDefs = gql\` \n${typeQuery} ${typeMutation} ${typeDefs}\``;
  return `const { gql } = require('apollo-server-express');\n\nexport const typeDefs = gql\` \n${typeDefs} ${typeInputs} ${typeQuery} ${typeMutation}\``;
};

module.exports = jsonToGraphQLTypes;