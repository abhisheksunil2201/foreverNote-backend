const Notebook = require("../../models/Notebook");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getNotebooks: async (_, { userId }) => {
      try {
        const notebooks = await Notebook.find({ user: userId }).sort({
          createdAt: -1,
        });
        return notebooks;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getNotebook(_, { userId, title }) {
      try {
        const notebook = await Notebook.find({ user: userId, title: title });
        if (notebook) {
          return notebook[0];
        } else {
          throw new Error("Notebook not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createNotebook(_, { title }, context) {
      const user = checkAuth(context);

      if (title.trim() === "") {
        throw new Error("Notebook title must not be empty");
      }
      const notebookInDb = await Notebook.findOne({
        user: user.id,
        title: title,
      });
      if (notebookInDb) {
        console.log(notebookInDb);
        throw new Error("Notebook title already exists");
      }

      const newNotebook = new Notebook({
        title,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const notebook = await newNotebook.save();

      context.pubsub.publish("NEW_NOTEBOOK", {
        newNotebook: notebook,
      });

      return notebook;
    },
    async deleteNotebook(_, { notebookId }, context) {
      const user = checkAuth(context);

      try {
        const notebook = await Notebook.findById(notebookId);
        await notebook.delete();
        return notebook;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newNotebook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_NOTEBOOK"),
    },
  },
};
