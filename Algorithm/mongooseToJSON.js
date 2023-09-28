const fs = require('fs'); 
const path = require('path');
const mongoose = require('mongoose');
//schema contains all of the paths that the user defined in the config file; we can then iterate through the object. 
// const schemas = require('../../apolloconfig.js');

//the final object that contains 
const exportModels = {
  "models": [
]}

//iterating through schemas object 
const convertSchema = () => {
    const schemas = require('./index.js'); 
    console.log('schemasInMongooseToJson:', schemas); 
    for(const schema in schemas){//iterating through schemas
        //for every property on the schemas object, we are creating a key-value pair, where "name" is the key, and the model name is the value. 
        //the schema key will hold all of the relevant fields for the JSON object that's created for the next step of the algorithm 
        const currentSchema = {
          "name": schema,
          "schema": {
          }
        };
        // console.log("Schemas:", schemas[prop])
        //this is the "tree" for each schema that the user defined in their config file
        const mongoSchema = schemas[schema].schema.tree;
        //for in loop will iterate through each of the user's schemas, and build out "current schema", that will eventually be pushed into the final exportModels object
        for(field in mongoSchema){//iterating through each field in each schema
          let isReference = false;
          let fieldisObject = false;
          let isArray = false;
          let currFieldValue = mongoSchema[field];
          //*note to John - we also have to account for mo ngoose schemas that are simpler (re: smartphone)
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
              
              //checks to see if type is a referenc
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
              // console.log("mongoSchemas[field]:", mongoSchemas[field])
              currentSchema.schema[field] = convertType(currFieldValue);
            }
            //...the rest of the types when we get to them
          }
        }
        // console.log("currentSchema:", currentSchema)
        // console.log("model tree: ", schemas[prop].schema.tree)
        //push the generated object into the exportModels object
        exportModels.models.push(currentSchema);
    }
    //the next algorithm is expecting a JSON object.
    return JSON.stringify(exportModels); 
}

// console.log(convertSchema());

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
    //buffer, mixed, objectId, array, map, schema, UUID needed
    //graphQL types => Int, Float, String, Boolean, ID
    //!!!!Come back and add the other ones!!!
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

  //John to Davis -  We will need a separate function for this that we invoke up in the for loop that iterates through mongooseSchemas
  //need to check if required is true or false/not present.
  //if required = true; concat a ! to the returned string (that field is required)
  //!!!!!!does this need to be a string? 
  // if (mongoSchemas[field].required === true){
  //   return returnedArg + "!"
  // } else {
  // return returnedArg; 
  // };
}

// //   Usage
// const configPath = findConfigFile();

//   if (configPath) {
//     const schemas = require(configPath);
//     // Use the configuration as needed
//     console.log('Found config file:', schemas);
//     convertSchema(schemas);
//   } else {
//     console.error('Configuration file not found.');
//   }


//Parses through a file and searches using the regex expression
function regexParser(text,regexExpr) {

    // Use the regular expression to find the model name
    const matches = regexExpr.exec(text);

    if (matches) {
    // console.log("matches:", matches); 
      return matches[0]; // The model name is captured in the first capturing group
    } else {
      return "null"; // Model name not found
    }
}

//this function parses the file the returns the fileContents 
function parseFile(filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return fileContents;
    } catch (err) {
      throw new Error(`Error reading or parsing the file: ${err.message}`);
    }
  }

module.exports = { convertSchema, convertType }

// //this is a function that parses through their file to grab their mongo schema 
// function findMongooseSchema(passedFile){ 
//   //find index of start of mongoose schema
//   const mongooseSchemaIndex = passedFile.search(/mongoose.Schema\s?\(\s?/);
//   // console.log('mongooseSchemaIndex', mongooseSchemaIndex);
//   //mongooseSlice is the code from mongoose.Schema to the end of the file. 
//   const mongooseSlice = passedFile.slice(mongooseSchemaIndex);
//   // console.log("mongooseSlice:", mongooseSlice);
//   //using new index, find the index of the first occuring '{'; openingCurlyBrace grabs the index of the opening curly brace
//   const openingCurlyBrace = mongooseSlice.search('{') + 1;
//   // console.log("curlyBrace:" , openingCurlyBrace);
//   //Write algorithm for matching curly braces so that we know when the schema ends, return the index of last curly brace
//   const closingCurlyBrace = findIndexCloseBrace(mongooseSlice, openingCurlyBrace); 
//   // console.log("closingCurlyBrace:" , closingCurlyBrace);
//   //slice the string to get the entire object; return is used for the Function constructor
//   const slicedMongooseSchema = 'return ' + mongooseSlice.slice(openingCurlyBrace - 1, closingCurlyBrace);
//   // console.log("slicedMongooseSchema:", slicedMongooseSchema);
  
//   // create a function to return the 'new Function'
//   function createFunction(){
//     return new Function(slicedMongooseSchema);
//   }
//   //create a new variable to hold the new function definition that contains the object
//   const mongooseSchema = createFunction();
//   // console.log('testtt')
//   // console.log('mongooseSchema', JSON.stringify(mongooseSchema()))
//   // console.log('type', typeof mongooseSchema());
  
//   return mongooseSlice.slice(openingCurlyBrace - 1, closingCurlyBrace);
// }

// //this function parses through the sliced segment of the schema file that contains everything after the first curly brace; this function will determine the index of the final closing brace so that we can grab the entire schema object
// function findIndexCloseBrace(sliced, startingIndex){ 
//       //use mongooseSlice for text and openingCurlyBrace for '{' index
//     //iterate through every character
//       //use a stack to keep track of all curly braces, when stack is empty the end of the object has been found
//       let currIndex = startingIndex;
//       const stack = ['{'];
//       while(stack.length > 0){
//         if(sliced[currIndex] === '{'){
//           stack.push('{');
//         } else if(sliced[currIndex] === '}'){
//           stack.pop();
//         }   
//         currIndex++;
//       }
//       return currIndex; 
// }

//input: mongoose schema in a string format...ex '{...}'
//output: new object containing all of the k:v pairs. All values will be in string form


//code graveyard
        // const filePath = path.join(__dirname, schemas[prop]);
        // const fileText = parseFile(filePath); 
        // const modelName = regexParser(fileText, collectionNameRegex);
        // console.log("modelName:", modelName)
        // const mongooseSchema = findMongooseSchema(fileText);
        // console.log('mongoose schema:' , mongooseSchema)//this logs the texts of the entire current mongoose schema
        //invoke function to parse through schema and create an object with proper k:v pairs
        // const mongooseObject = mongooseStringToObject(mongooseSchema);