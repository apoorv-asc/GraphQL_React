const graphql = require("graphql");
const _ = require("lodash"); // Helps in searching

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

var books = [
  { id: "1", authorID: "1", name: "Name of the Wind", genre: "Fantasy" },
  { id: "2", authorID: "2", name: "The Final Empire", genre: "Fantasy" },
  { id: "3", authorID: "3", name: "The Long Earth", genre: "Sci-Fi" },
  { id: "4", authorID: "2", name: "The Heroes of Ages", genre: "Fantasy" },
  { id: "5", authorID: "3", name: "The Color of Majic", genre: "Fantasy" },
  { id: "6", authorID: "3", name: "The Light Fantastic", genre: "Fantasy" },
];

var author = [
  { id: "1", name: "Apoorv Singh", age: 22 },
  { id: "2", name: "Joyeeta Dey", age: 21 },
  { id: "3", name: "Karmanya Tyagi", age: 22 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(author, { id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: graphql.GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Code to get result from DB
        // Have access to args.id
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(author, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return author;
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
