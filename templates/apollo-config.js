//This is the template for how the apollo-config.js file should be set up in order for the package to access the Mongoose models. 

const schemas = {
    //Each mongoose model should be listed below. 
    //The formatting should be "Name of Mongoose Model": require('file path to get to the Mongoose schemas from this file')
    //For example, Author: require('./server/models/Author.js'), or Smartphone: require('./Schema/MongoSchemaTwo.js') 
}

module.exports = schemas;