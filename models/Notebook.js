const { model, Schema } = require("mongoose");

const notebookSchema = new Schema({
  title: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  notes: [
    {
      body: String,
      title: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Notebook", notebookSchema);
