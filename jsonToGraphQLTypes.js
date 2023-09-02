//store the evaluated result of invoking jsonToGraphQLTypes on user's object in a variable
//will write that variable to the user's file 

//test


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
  
    console.log(typeInputs);
  
    // return `const typeDefs = gql\` \n${typeQuery} ${typeMutation} ${typeDefs}\``;
    return `export const typeDefs = gql\` \n${typeDefs} ${typeInputs} ${typeQuery} ${typeMutation}\``;
  };
  
  const exampleJSON = {
    "models": [
      {
        "name": "User",
        "schema": {
          "name": "String",
          "age": "Float",
          "friends": "[User]"
        }
      },
      {
        "name": "Post",
        "schema": {
          "title": "String!",
          "content": "String"
        }
      }
    ]
  };
  
  console.log(jsonToGraphQLTypes(exampleJSON));
  
  
  
  const fs = require('fs');
  
  function writeTypesToFile(graphQLTypes) {
    // Create directory if it doesn't exist
    if (!fs.existsSync('schema')) {
      fs.mkdirSync('schema');
    }
  
    // Loop through each GraphQL type and write to a file
  
    //also write to their file: const { ApolloServer, gql } = require('apollo-server');
      fs.writeFileSync(`Types.js`, `variable holding result of invoking function on user's JSON object`);
    
  }
  
  // Assume the function jsonToGraphQLTypes() returns the GraphQL types in the same format as in the previous examples
  // const types = jsonToGraphQLTypes(exampleJson);
  
  // writeTypesToFile(types);
  
  
  //Mutations:
  
  
  
  