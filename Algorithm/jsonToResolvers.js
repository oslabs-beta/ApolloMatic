const path = require('path');
const fs = require('fs');

const extractPathFromRequire = (requireStatement) => {
  const match = requireStatement.match(/require\('(.+?)'\)/);
  return match ? match[1] : null;
};

const getConfigRequireStatements = () => {
  const configFilePath = path.resolve(__dirname, '../apollo-config.js');  // adjust the path to your config file
  const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
  const requireStatements = configFileContent.match(/require\('.+?'\)/g);
  return requireStatements;
};

const jsonToResolvers = (jsonObj, schemas) => {
  const indentation = "  ";


  const requireStatements = getConfigRequireStatements();

  let importStatements = Object.keys(schemas).map((modelName, index) => {
      const modelPath = extractPathFromRequire(requireStatements[index]);
      const adjustedPath = path.join('..', modelPath);
      return `const ${modelName} = require('${adjustedPath}');\n`;
  }).join('');

  // Concatenate import statements with the ApolloError import
  importStatements = `const { ApolloError } = require('apollo-server-express');\n${importStatements}\n`;
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
  return `${importStatements}${queryReturnStatement}${queryReturnBody}${indentation}},\n${mutationReturnStatement}\n${mutationReturnBody}${indentation}},\n};`;  // Include importStatement here
};


module.exports = jsonToResolvers;