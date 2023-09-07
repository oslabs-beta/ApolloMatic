//iterate through the json object, grab each model.name (type)
//generate root query resolver for each type , singular and plural 

//test

//need to import their database model files , like Users.js / Post.js etc 

const jsonToResolvers = (jsonObj) => {
    const indentation = '  '; 

    let queryReturnStatement = `const resolvers = { \n${indentation}Query: {\n`

    let mutationReturnStatement = `${indentation}Mutation: {`

    let mutationReturnBody = '';


    let queryReturnBody = '';

    //on each iteration to lowercase the type, add singular and plural of that type 
    jsonObj.models.forEach((model) => {
        const typeName = model.name;

        queryReturnBody += `${indentation}${indentation}${typeName.toLowerCase()}: (parent, args, context, info) => {\n${indentation}${indentation}${indentation}return ${typeName}.findById(args.id);\n${indentation}${indentation}},\n`;
        queryReturnBody += `${indentation}${indentation}${typeName.toLowerCase()}s: () => {\n${indentation}${indentation}${indentation}return ${typeName}.find();\n${indentation}${indentation}},\n`;

        //for each type name, we need to create an add, update, delete 

        mutationReturnBody += `\n${indentation}${indentation}add${typeName}: async (parent, args, context, info) => {\n${indentation}${indentation}${indentation}const { input } = args;\n${indentation}${indentation}${indentation}try {\n${indentation}${indentation}${indentation}${indentation}const new${typeName} = new ${typeName}({\n${indentation}${indentation}${indentation}${indentation}${indentation}...input\n${indentation}${indentation}${indentation}${indentation}});\n${indentation}${indentation}${indentation}${indentation}return new${typeName};\n${indentation}${indentation}${indentation}} catch (error) { \n${indentation}${indentation}${indentation}${indentation}throw new ApolloError('Error adding a ${typeName}', 'ADD_${typeName.toUpperCase()}_ERROR', { error });\n${indentation}${indentation}${indentation}}\n${indentation}${indentation}},\n${indentation}`
    })
    return `${queryReturnStatement}${queryReturnBody}${indentation}},\n${mutationReturnStatement}${mutationReturnBody}},\n};`
}

const resolvers = {
    Mutation: {
      createUser: (parent, args) => {
        const { input } = args;
        // Implement logic to create a new user, e.g., save to a database
        const newUser = {
          id: '1', // Replace with the actual ID generated for the new user
          ...input,
        };
        return newUser;
      },
    },
  };

// const exampleJSON = {
//     "models": [
//       {
//         "name": "User",
//         "schema": {
//           "name": "String",
//           "age": "Float",
//           "friends": "[User]"
//         }
//       },
//       {
//         "name": "Post",
//         "schema": {
//           "title": "String!",
//           "content": "String"
//         }
//       }
//     ]
//   };


module.exports = jsonToResolvers











