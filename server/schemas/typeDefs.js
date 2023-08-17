const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  ##TODO create input types for all parameters
   input AuthorInput {
    authors: [String]
  }

   input DescriptionInput {
    description: String!
  }

   input TitleInput {
    title: String!
  }

   input BookIdInput {
    bookId: String!
  }

   input ImageInput {
    image: String
  }

   input LinkInput {
    link: String
  }

  input SavedBooksInput {
    authors: AuthorInput
    description: DescriptionInput
    title: TitleInput
    bookId: BookIdInput
    image: ImageInput
    link: LinkInput
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SavedBookInput): User
    removeBook(input: BookdIdInput): User
  }
`;

module.exports = typeDefs;