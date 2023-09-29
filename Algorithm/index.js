const fs = require('fs'); 
const path = require('path');
const mongoose = require('mongoose');
// const schemas = require('../config');
const exportModels = {
  "models": [
]}
const typesFunction = require('./jsonToGraphQLTypes');
const resolversFunction = require('./jsonToResolvers');

const findSchemas = require('./findSchemas'); 

const { convertSchema, convertType } = require('./mongooseToJSON')

//
let configFilePath = findSchemas(); 

console.log("configFilePath: ", configFilePath);

if (configFilePath) {
  const schemas = require(configFilePath);
  console.log('schemas:', schemas);
  module.exports = schemas; 
} else {
  console.error('Configuration file not found.');
}

//parse the mongo schema and convert it into a JSON object
let parsedMongoSchema = convertSchema(); 

console.log('parsedMongoSchema:', parsedMongoSchema); 

parsedMongoSchema = JSON.parse(parsedMongoSchema);
// Generate GraphQL types and resolvers based on parsed schema
const graphQLTypes = typesFunction(parsedMongoSchema);
console.log(graphQLTypes);
const graphQLResolvers = resolversFunction(parsedMongoSchema);
console.log(graphQLResolvers);


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
