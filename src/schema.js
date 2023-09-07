export const typeDefs = gql` 
type Smartphone {
  id: ID!
  name: String
  price: Float
  inStock: Boolean
}

type User {
  id: ID!
  name: String!
  hiddenField: Map
  age: Float!
  friends: 
}

 input SmartphoneInput {
  name: String
  price: Float
  inStock: Boolean
}

input UserInput {
  name: String!
  hiddenField: Map
  age: Float!
  friends: 
}

 type Query {
  smartphone(id: ID!): Smartphone
  smartphones: [Smartphone]
  user(id: ID!): User
  users: [User]
}

 type Mutation {
  addSmartphone(input: SmartphoneInput!): Smartphone
  updateSmartphone(id: ID!, input: SmartphoneInput!): Smartphone
  deleteSmartphone(id: ID!): Smartphone
  addUser(input: UserInput!): User
  updateUser(id: ID!, input: UserInput!): User
  deleteUser(id: ID!): User
}

`