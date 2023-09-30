const findSchemas = require('./findSchemas'); // Assuming you have a findSchemas module

let configFilePath = findSchemas(); 

console.log("configFilePath: ", configFilePath);

if (configFilePath) {
  const schemas = require(configFilePath);
  module.exports = schemas; // Export 'schemas' to be used in other files
} else {
  console.error('Configuration file not found.');
}