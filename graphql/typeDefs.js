const { gql } = require("apollo-server");

module.exports = gql`
  type Notebook {
    id: ID!
    title: String!
    createdAt: String!
    username: String!
    notes: [Note]!
  }
  type Note {
    id: ID!
    title: String!
    createdAt: String!
    body: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getNotebooks(userId: ID!): [Notebook]
    getNotebook(userId: ID!, title: String!): Notebook
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createNotebook(title: String!): Notebook!
    deleteNotebook(notebookId: ID!): Notebook!
    createNote(notebookId: ID!, title: String!, body: String!): Notebook!
    deleteNote(notebookId: ID!, noteId: ID!): Notebook!
    editNote(
      notebookId: ID!
      noteId: ID!
      title: String!
      body: String!
    ): Notebook!
  }
  type Subscription {
    newNotebook: Notebook!
  }
`;
