const jsonToResolvers = (jsonObj) => {
  const indentation = "  ";

  let importStatement = `const { ApolloError } = require('apollo-server-express');\n\n`;  // Import statement
  let queryReturnStatement = `const resolvers = { \n${indentation}Query: {\n`;

  let mutationReturnStatement = `${indentation}Mutation: {`;

  let mutationReturnBody = "";

  let queryReturnBody = "";

  //indentation types
  const indentByTwo = `${indentation}${indentation}`;
  const indentByThree = `\n${indentation}${indentation}${indentation}`;
  const indentByFour = `\n${indentation}${indentation}${indentation}${indentation}`;
  const indentByFive = `\n${indentation}${indentation}${indentation}${indentation}${indentation}`;

  //on each iteration to lowercase the type, add singular and plural of that type
  jsonObj.models.forEach((model) => {
    const typeName = model.name;

    const findById = `${indentByTwo}${typeName.toLowerCase()}: (parent, args, context, info) => {${indentByThree}return ${typeName}.findById(args.id);\n${indentByTwo}},\n`;
    const findAll = `${indentByTwo}${typeName.toLowerCase()}s: () => {${indentByThree}return ${typeName}.find();\n${indentByTwo}},\n`;

    //Add queries to queryReturnBody
    queryReturnBody += `${findById}${findAll}`;

    //for each type name,  create an add, update, delete
    //string literal to add mutation
    const addMutation = `${indentByTwo}add${typeName}: async (parent, args, context, info) => {${indentByThree}const { input } = args;${indentByThree}try {${indentByFour}const new${typeName} = new ${typeName}({${indentByFive}...input${indentByFour}});${indentByFour}return new${typeName};${indentByThree}} catch (error) {${indentByFour}throw new ApolloError('Error adding a ${typeName}', 'ADD_${typeName.toUpperCase()}_ERROR', { error });${indentByThree}}\n${indentByTwo}},\n`;

    //string literal to delete mutation
    const deleteMutation = `${indentByTwo}delete${typeName}: async (parent, args, context, info) => {${indentByThree}try {${indentByFour}const delete${typeName} =  await ${typeName}.findByIdAndRemove(args.id);${indentByFour}if (!delete${typeName}) {${indentByFive}throw new ApolloError('${typeName} not found', '${typeName.toUpperCase()}_NOT_FOUND');${indentByFour}}${indentByFour}return delete${typeName};${indentByThree}} catch (error) {${indentByFour}throw new ApolloError('Error deleting a ${typeName}', 'DELETE_${typeName.toUpperCase()}_ERROR', { error });${indentByThree}}\n${indentByTwo}},\n`;

   //string literal to update mutation
    const updateMutation = `${indentByTwo}update${typeName}: async (parent, args, context, info) => {${indentByThree}const { input } = args;${indentByThree}try {${indentByFour}const updated${typeName} = await ${typeName}.findByIdAndUpdate(args.id, {${indentByFive}...input${indentByFour}}, { new: true });${indentByFour}if (!updated${typeName}) {${indentByFive}throw new ApolloError('${typeName} not found', '${typeName.toUpperCase()}_NOT_FOUND');${indentByFour}}${indentByFour}return updated${typeName};${indentByThree}} catch (error) {${indentByFour}throw new ApolloError('Error updating a ${typeName}', 'UPDATE_${typeName.toUpperCase()}_ERROR', { error });${indentByThree}}\n${indentByTwo}},\n`;

    //string literal to create mutation

    //Add each created mutation to the mutationReturnBody var
    mutationReturnBody += `${addMutation}${deleteMutation}${updateMutation}`;  // Include updateMutation here

  });
  return `${importStatement}${queryReturnStatement}${queryReturnBody}${indentation}},\n${mutationReturnStatement}\n${mutationReturnBody}${indentation}},\n};`;  // Include importStatement here
};

const resolvers = {
  Mutation: {
    createUser: (parent, args) => {
      const { input } = args;
      // Implement logic to create a new user, e.g., save to a database
      const newUser = {
        id: "1", // Replace with the actual ID generated for the new user
        ...input,
      };
      return newUser;
    },
  },
};

module.exports = jsonToResolvers;
