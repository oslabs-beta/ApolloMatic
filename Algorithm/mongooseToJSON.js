const mongoose = require("mongoose");

//testing... delete after done with tests
// const schemas = require("../config");

//the final object that contains
const exportModels = {
  models: [],
};
//types obj that allows for conversion
  const typesObj = {
    "function String() { [native code] }" : "String", //String
    "function Number() { [native code] }": "Float",   //Number
    "function Date() { [native code] }" : "ApolloMaticDateScalar",
    // Buffer: ApolloMaticBufferScalar,
    "function Boolean() { [native code] }": "Boolean",
    // Mixed: ,
    // ObjectId: , -> This is taken care of in the convertSchema function.
    // Array: , (Done - Checked recursively)
    //Decimal128 (Done cannot be checked here. There is a section to account for this in convertType near the end.)
    // Map:,
    // Schema: ,
    // UUID: (Done cannot be checked here. There is a section to account for this in convertType near the end.)
    // BigInt: "Int",
  };
  //iterating through schemas object
  const convertSchema = () => {
  const schemas = require('./index.js'); 
  // console.log('schemasInMongooseToJson:', schemas); 
  //push all schema names to schemaList for reference
  for(const schemaName in schemas){
    typesObj[schemaName] = schemaName;
  }
  // console.log("Types Obj:", typesObj)
  for (const schema in schemas) {
    //holds all converted apollo graphql schemas 
    const currentSchema = {
      name: schema,
    };
    currentSchema.schema = {};
    // console.log(currentSchema)
    const schemaTree = schemas[schema].schema.tree;
    // console.log("SchemaTree: ", schemaTree)
    for (field in schemaTree) {
      // console.log("THIS TREE...",field," : " , JSON.stringify(schemaTree[field]) )
      // console.log("THIS TREE...",field," : " , schemaTree[field] )
      // console.log("typeof: ", typeof schemaTree[field]);
      // console.log("isArray?: ", Array.isArray(schemaTree[field]));
      // console.log("Does type exist? :", schemaTree[field].type)
      // console.log("is this nested?: ", schemaTree[field].thisIsNested)
      console.log("\n\n\n");
      let isReference = false;

      let isArray = false;
      let currFieldValue = schemaTree[field];
      // console.log("Field Value:", currFieldValue)
      if (field !== "_id" && field !== "id" && field !== "__v") {
        // console.log(currentSchema.schema);
        currentSchema.schema[field] = convertType(currFieldValue);
      }
    }
    console.log("CurrentSchema Complete: ", currentSchema);
     //push the generated object into the exportModels object
     exportModels.models.push(currentSchema);
  }//for loop for schemas
  //the next algorithm is expecting a JSON object.
  return JSON.stringify(exportModels); 
};//end convert schema fucntion


function convertType(arg, nested = false) {
  console.log("Arg.", arg)
  let type = "";

  /*

      Recursive Cases

  */

  //If arg...
    //has a type property AND (is NOT and object OR type IS an array)...
    //then recursion will be used by passing in the value of arg.type
  if(arg.type && (!(typeof arg.type === "object") || Array.isArray(arg.type))) return convertType(arg.type);
  if((arg.type && arg.type.obj)){//|| (arg.type && arg.type.obj)
    // console.log( "Type obj: ", arg.type.obj)
    const tempObj = {};
    for(const [k, v] of Object.entries(arg.type.obj)){
      console.log("Converting :", v)
      tempObj[k] = convertType(v);
    }
    // console.log("Temp Obj :" , tempObj)
    return tempObj;

  } 
  
  //If arg...
    //IS an array...
    //then recursively call the 0th element , returning the evaluated result wrapped in brackets
  if(Array.isArray(arg)){
    // console.log("Array!: ",arg[0])
    return "[" + convertType(arg[0]) +  "]";
  } 
  //If arg...
    //IS an object AND the type is not a property OR( type and type.obj IS a property)
    //then iterate through
    //This accounts for 
  if((typeof arg === "object" && !arg.type)){//|| (arg.type && arg.type.obj)
    // console.log( "Type obj: ", arg.type.obj)
    const tempObj = {};
    for(const [k, v] of Object.entries(arg)){
      console.log("Converting :", v)
      tempObj[k] = convertType(v);
    }
    console.log("Temp Obj :" , tempObj)
    return tempObj;

  } 

  /*

      End Recursive Cases

  */
  
  //if it is an object with no type, it is a nested object
  
  //turn the arg into a string.
  const stringifiedArg = String(arg);
  console.log("Stringified type: ", stringifiedArg)
  console.log("--------------------------------------------------------------------------------------------------------------")

  //check to see if the keys in the typesObj are present within the passed in arg.
  for (const string in typesObj) {
    if (stringifiedArg === string) {
      type = typesObj[string];
    }
    //what happens when the string isn't present within the passed in arg?
  }
  //if no types are found from the for loop cheching the types object, check the edge cases here that are not as simple to check
  //check for decimal128
  if("class Decimal128 extends BSONValue" === stringifiedArg.slice(0,34)){//Decimal128
    type = "Float";
  }else if ("function SchemaUUID" === stringifiedArg.slice(0,19)){//UUID
    type = "String";
  }else if ("function Buffer" === stringifiedArg.slice(0,15)){//Buffer
    type = "ApolloMaticBufferScalar";
  }else if ("function Mixed" === stringifiedArg.slice(0,14)){//Buffer
    type = "ApolloMaticMixedScalar";
  }else if ("class ObjectId extends BSONValue {" === stringifiedArg.slice(0,34)){//Buffer
    type = "ID";
  }




  


  return type;
}
console.log("exportModels: ",exportModels);
module.exports = { convertSchema, convertType };