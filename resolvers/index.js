const resolvers = { 
  Query: {
    smartphone: (parent, args, context, info) => {
      return Smartphone.findById(args.id);
    },
    smartphones: () => {
      return Smartphone.find();
    },
    user: (parent, args, context, info) => {
      return User.findById(args.id);
    },
    users: () => {
      return User.find();
    },
  },
  Mutation: {
    addSmartphone: async (parent, args, context, info) => {
      const { input } = args;
      try {
        const newSmartphone = new Smartphone({
          ...input
        });
        return newSmartphone;
      } catch (error) { 
        throw new ApolloError('Error adding a Smartphone', 'ADD_SMARTPHONE_ERROR', { error });
      }
    },
  
    addUser: async (parent, args, context, info) => {
      const { input } = args;
      try {
        const newUser = new User({
          ...input
        });
        return newUser;
      } catch (error) { 
        throw new ApolloError('Error adding a User', 'ADD_USER_ERROR', { error });
      }
    },
  },
};