const fs = require('fs');
const path = require('path');

const findConfigFile = () => {
    const configFileNames = ['apolloconfig.js']; 
    let configPath = null;
  
    // Get the current working directory
    const rootDir = process.cwd();
  
    // Recursive function to search for the configuration file
    function search(dir) {
      for (const fileName of configFileNames) {
        const filePath = path.join(dir, fileName);
        if (fs.existsSync(filePath)) {
          configPath = filePath;
          break;
        }
      }
  
      // If not found, check parent directory
      if (!configPath && dir !== rootDir) {
        const parentDir = path.dirname(dir);
        search(parentDir);
      }
    }
  
    // Start the search from the current working directory
    search(rootDir);
  
    return configPath;
  }
  
// //   Usage
//   const configPath = findConfigFile();
  
//   if (configPath) {
//     const config = require(configPath);
//     console.log(config);
//     // Use the configuration as needed
//     return config; 
//     console.log('Found config file:', configPath);
//   } else {
//     console.error('Configuration file not found.');
//   }

module.exports = findConfigFile;
// const findUp = require('find-up');
// const path = require('path');

// import('find-up').then(findUp => {
//     function findSchemas() {
//         //attempt to find the config file in the user's project root 
//         const configFilePath = findUp.findUpSync(['apolloconfig.js'])
      
//         if(configFilePath){
//           //Load the user's configuration file
//           const schemas = require(path.resolve(configFilePath)); 
//           return schemas; 
//         } else {
//           console.error('apollomatic.js not found.');
//           return null; 
//         }
//       }
//   }).catch(error => {
//     console.error('Error importing find-up:', error);
//   });


  
//   module.exports = findSchemas;


