
const mongoose = require('mongoose');

//schema contains all of the paths that the user defined in the config file; we can then iterate through the object. 
const schemas = require('../apollo-config');

//the final object that contains 
const exportModels = {
  "models": [
]}

//iterating through schemas object 
const convertSchema = () => {

    for(const schema in schemas){//iterating through schemas
        //for every property on the schemas object, we are creating a key-value pair, where "name" is the key, and the model name is the value. 
        //the schema key will hold all of the relevant fields for the JSON object that's created for the next step of the algorithm 
        const currentSchema = {
          "name": schema,
          "schema": {
          }
        };
   
        //this is the "tree" for each schema that the user defined in their config file
        const mongoSchema = schemas[schema].schema.tree;
        //for in loop will iterate through each of the user's schemas, and build out "current schema", that will eventually be pushed into the final exportModels object
        for(field in mongoSchema){//iterating through each field in each schema
          let isReference = false;
    
          let isArray = false;
          let currFieldValue = mongoSchema[field];
         
          if (field !== "_id" && field !=="id" && field !== "__v"){
            

            //Check the field for formatting...ex [], {}, [{}]
            if(Array.isArray(currFieldValue)){
              //flag this field as an array
              isArray = true;
              //alter the currentFieldValue to be the first element (so that we can check if it is an object)
              currFieldValue = currFieldValue[0];
              // console.log(currFieldValue)
             }
            //This conditional is checking to see if the type property exits on mongoSchema[field]. This clarifies 
            //the format that the user is using
            if (currFieldValue.type !== undefined){//field is a nested object
              
              //checks to see if type is a reference
              if(String(currFieldValue.type).includes('ObjectId') && currFieldValue.ref){
                isReference = true;
              }

              //if type is a reference, get the ref value
              if(isReference){
                currentSchema.schema[field] = currFieldValue.ref
              }else{
                currentSchema.schema[field] = convertType(currFieldValue.type);
              }
              //add brackets of this is an array
              if(isArray){
                currentSchema.schema[field] = "[" + currentSchema.schema[field] + "]";
              }
            //Required
            if(currFieldValue.required === true) {
              currentSchema.schema[field] += '!';
              }
            } else {//field is not an object
              //what happens with the simpler schema? Required property MUST be enclosed within an object - so we don't have to account for it here?
         
              currentSchema.schema[field] = convertType(currFieldValue);
            }
            //...the rest of the types when we get to them
          }
        }
       
        //push the generated object into the exportModels object
        exportModels.models.push(currentSchema);
    }
    //the next algorithm is expecting a JSON object.
    return JSON.stringify(exportModels); 
}

console.log(convertSchema());//delete

function convertType(arg){

  //types obj that allows for conversion
  const typesObj = {
    String: "String",
    Number: "Float",
    Date: "Int",
    Boolean: "Boolean",
    BigInt: "Int",
    Decimal128: "Float",
    Map: "Map"
    
  }

  let type = "";

  //turn the arg into a string. 
  const stringifiedArg = String(arg); 
  
  //check to see if the keys in the typesObj are present within the passed in arg.  
  for (const string in typesObj){
    // console.log(String(string))
    if (stringifiedArg.includes(String(string))) {
      type = typesObj[string];
    }
    //what happens when the string isn't present within the passed in arg? 
  }
  return type;

}

module.exports = { convertSchema, convertType }

