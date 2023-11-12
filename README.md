<p align="center">
<img width="200" height="200" src="https://github.com/KahaliaS/apollomatic-imgs/blob/main/imgs/apollomatic-logo-sm.png">
</p>

<p align="center">
<img  src="https://github.com/KahaliaS/apollomatic-imgs/blob/main/imgs/apollomatic-text-logo.png">
</p>

# What is ApolloMatic?
ApolloMatic is an open-source developer tool that automates Mongoose to GraphQL integration.

### Tech Stack
	
  <div style="display: flex;">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
    <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
    <img src = "https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white"/>
    <img src= "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white"/> 
  </div>

### Quick Links

<div style="display:flex;">
💻 Browse our <a href="http://www.apollomatic.com/">website</a> &nbsp;&nbsp;&nbsp;
<img src="https://miro.medium.com/v2/resize:fit:1400/1*psYl0y9DUzZWtHzFJLIvTw.png" width="20" height="20"/> Check out our <a href="#"> Medium</a> Article &nbsp;&nbsp;&nbsp;
<img src="https://cdn-icons-png.flaticon.com/256/174/174857.png" width="20" height="20"/>  Catch us on <a href="https://www.linkedin.com/company/apollomatic/">LinkedIn</a> &nbsp;&nbsp;&nbsp;
<img src="https://github.com/get-icon/geticon/blob/master/icons/npm.svg" width="20" height="20"/> Visit our <a href="https://www.npmjs.com/package/apollomatic">npm </a> library
</div>

# Features
Automatic Schema Generation: Apollomatic automatically generates GraphQL schemas based on your existing Mongo schemas, including types for queries, mutations, and the Mongo objects.

Efficient Resolvers: The package creates resolvers that correspond to the types within the GraphQL schema, saving you the effort of writing them from scratch. These resolvers are functionally integrated with your database, linked to your Mongo models.

Time-Saving Solution: Whether you are new to GraphQL or an experienced developer, Apollomatic can significantly reduce the time and effort required to set up your GraphQL API.

### Tech Stack Needed in Your Project:
<div style="display: flex;">
<img src="https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white"/>
<img src= "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/Apollo%20GraphQL-311C87.svg?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
</div>

# Installation
Before you can use Apollomatic, ensure you have Node.js and NPM installed on your system. To install Apollomatic, follow these steps:

Run the following command in your project's root directory:

`npm install -g apollomatic`

Once installed, you can use Apollomatic by running the following command in your terminal:

`npx apollomatic`

# Configuration

To configure Apollomatic for your project, create an `apollo-config.js file`. 

This file contains the necessary information for Apollomatic to work. Here's how to set up your `apollo-config.js`:

- [x] Navigate to your project's root directory.
- [x] Locate the apollo-config.js file provided in the Apollomatic package. You can find it in the "templates" directory.
- [x] Copy the config file and paste it into your project's root directory.
- [x] Modify the copied apollo-config.js file to match your project's specific configuration needs. You can refer to our documentation for guidance on configuring Apollo.

Save your changes. Now, your project is configured with Apollo using the apollo-config.js file you customized.

# ApolloMatic in Action?

Apollomatic will take your Mongoose schemas and generate code for you to get started in Apollo Server. If the installation is successful, two new files will appear in your project directory: an index.js file under the "resolvers" folder and a schema.js file under the "src" folder .

#### The schema.js file will be populated with definitions for the following:
- Custom scalar Types
- Object Types
- Input Types
- Query Types
- Mutation Types

#### The index.js file will be populated with:
- Query Resolvers
- Mutations Resolvers

This will allow for full CRUD functionality. 




