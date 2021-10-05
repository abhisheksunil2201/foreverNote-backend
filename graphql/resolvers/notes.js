const { UserInputError } = require("apollo-server");
const Notebook = require("../../models/Notebook");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    createNote: async (_, { notebookId, title, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty note", {
          errors: {
            body: "Note body must not empty",
          },
        });
      }

      const notebook = await Notebook.findById(notebookId);

      if (notebook) {
        notebook.notes.unshift({
          body,
          title,
          createdAt: new Date().toISOString(),
        });
        await notebook.save();
        return notebook;
      } else throw new UserInputError("Notebook not found");
    },
    deleteNote: async (_, { notebookId, noteId }, context) => {
      const { username } = checkAuth(context);

      const notebook = await Notebook.findById(notebookId);

      if (notebook) {
        const noteIndex = notebook.notes.findIndex((c) => c.id === noteId);
        notebook.notes.splice(noteIndex, 1);
        await notebook.save();
        return notebook;
      } else {
        throw new UserInputError("Notebook not found");
      }
    },
    editNote: async (_, { notebookId, noteId, title, body }, context) => {
      const { username } = checkAuth(context);
      const notebook = await Notebook.findById(notebookId);
      console.log(notebook);
      if (notebook) {
        const noteIndex = notebook.notes.findIndex((c) => c.id === noteId);
        notebook.notes[noteIndex].body = body;
        notebook.notes[noteIndex].title = title;
        notebook.notes[noteIndex].createdAt = new Date().toISOString();
        await notebook.save();
        return notebook;
      } else {
        throw new UserInputError("Notebook not found");
      }
    },
  },
};
