const fs = require('fs'); 
const path = require('path');
const mongoose = require('mongoose');
const schemas = require('../apolloconfig.js');
console.log('schema', schemas);
const exportModels = {
  "models": [
]}
const typesFunction = require('./jsonToGraphQLTypes');
const resolversFunction = require('./jsonToResolvers');

const { convertSchema, convertType } = require('./mongooseToJSON')

//parse the mongo schema and convert it into a JSON object
let parsedMongoSchema = convertSchema(); 


// console.log("Parsed Mongo: ", parsedMongoSchema);
parsedMongoSchema = JSON.parse(parsedMongoSchema);
// Generate GraphQL types and resolvers based on parsed schema
const graphQLTypes = typesFunction(parsedMongoSchema);
const graphQLResolvers = resolversFunction(parsedMongoSchema, schemas);



// Write to file

  
function writeTypesToFile(graphQLTypes) {
  // Create directory if it doesn't exist
  if (!fs.existsSync('src')) {   
    fs.mkdirSync('src');
  }
  //also write to their file: const { ApolloServer, gql } = require('apollo-server');
    fs.writeFileSync(`src/schema.js`, graphQLTypes);
  
}

writeTypesToFile(graphQLTypes);

function writeResolvesToFile(graphQLResolvers) {
  if (!fs.existsSync('resolvers')) {
    fs.mkdirSync('resolvers');
  }

  fs.writeFileSync('resolvers/index.js', graphQLResolvers);
}

writeResolvesToFile(graphQLResolvers);

//check if the src folder exists, if it doesn't, make one 
//add a file called schema and put graphQLTypes in it 

//src 
  //schema file for types 
  //resolver folder 
    //index.js 

