const notebooksResolvers = require("./notebooks");
const usersResolvers = require("./users");
const notesResolvers = require("./notes");
module.exports = {
  Query: {
    ...notebooksResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...notebooksResolvers.Mutation,
    ...notesResolvers.Mutation,
  },
  Subscription: {
    ...notebooksResolvers.Subscription,
  },
};
