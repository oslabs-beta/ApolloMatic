# ApolloMatic 
_Generate GraphQL schemas and resolvers for your Mongo schemas._

## What is Apollomatic?

Apollomatic is an NPM package designed to simplify the process of generating Apollo Server GraphQL schemas and resolvers from existing Mongo schemas. With just a single command, you can quickly jumpstart your GraphQL API without the need to manually define schemas and resolvers.

## Key Features

Automatic Schema Generation: Apollomatic automatically generates GraphQL schemas based on your existing Mongo schemas, including types for queries, mutations, and the Mongo objects.

Efficient Resolvers: The package creates resolvers that correspond to the types within the GraphQL schema, saving you the effort of writing them from scratch. These resolvers are functionally integrated with your database, linked to your Mongo models.

Time-Saving Solution: Whether you are new to GraphQL or an experienced developer, Apollomatic can significantly reduce the time and effort required to set up your GraphQL API.

## Getting Started

### Installation

Before you can use Apollomatic, ensure you have Node.js and NPM installed on your system. To install Apollomatic, follow these steps:

Run the following command in your project's root directory:

npm install -g apollomatic

Once installed, you can use Apollomatic by running the following command in your terminal:

npx apollomatic

If the installation is successful, two new files will appear in your project directory: an index.js file under the "resolvers" folder (containing generated resolvers), and a schema.js file under the "src" folder (containing generated schemas).

## Setting Up Your Configuration

To configure Apollomatic for your project, create an apollo-config.js file. This file contains the necessary information for Apollomatic to work. Here's how to set up your apollo-config.js:

Navigate to your project's root directory.

Locate the apollo-config.js file provided in the Apollomatic package. You can find it in the "templates" directory.

Copy the config file and paste it into your project's root directory.

Modify the copied apollo-config.js file to match your project's specific configuration needs. You can refer to our documentation for guidance on configuring Apollo.

Save your changes.

Now, your project is configured with Apollo using the apollo-config.js file you customized.

Testing Resolvers

You can test your generated resolvers in the following ways:

Apollo Studio: If you've set up an endpoint for your project, you can test your resolvers within Apollo Studio's Explorer interface. Note that data must be present in the connected database for the queries to return results.

Postman: Resolvers can also be tested using Postman. Ensure that the GraphQL option is selected for the 'Body' section, and the query and variables components should be configured.

Getting Help

If you need assistance or have questions about Apollomatic, you can reach out to us at hello.apollomatic@gmail.com. Additionally, found a bug or have an idea? Please open an issue or start a discussion. We value your feedback and contributions to make Apollomatic even more powerful and user-friendly.

Project Maintainers and Contributors

Special thanks to all the contributors and supporters who have starred this repository. Our amazing contributors include:

john-bilunas
juliabreeden
KahaliaS
mr-daviskim

If you appreciate this project, consider joining us or giving it a star. Your support will help attract more contributors and make the project even better.
