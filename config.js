// const smartphoneSchema = require('./Schema/MongoSchemaTwo');
// console.log(smartphoneSchema);


const schemas = {
    // Smartphone : '../Schema/MongoSchemaTwo.js',
    // User : '../Schema/MongoSchema.js',
    Smartphone: require('./Schema/MongoSchemaTwo.js'),
    User: require('./Schema/MongoSchema.js')
    
}

module.exports =  schemas;