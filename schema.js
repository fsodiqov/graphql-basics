export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!,
    players: [String!]!, 
    reviews: [Review!]!,
  }
  type Review {
    id: ID!
    rating: Int!,
    content: String!,
    game: Game!,
    author: Author!,
  }
  type Author {
    id: ID!
    name: String!, 
    verified: Boolean!,
    reviews: [Review!]!,
  }
  type Query {
    games: [Game],
    game(id: ID!): Game,
    reviews: [Review],
    review(id: ID!): Review,
    authors: [Author],
    author(id: ID!): Author,
  }
  type Mutation {
    createGame(title: String!, players: [String!]!): Game!,
    updateGame(id: ID!, title: String!, players: [String!]!): Game!,
    deleteGame(id: ID!): Game!,
    createReview(rating: Int!, content: String!, gameId: ID!, authorId: ID!): Review!,
    updateReview(id: ID!, rating: Int!, content: String!, gameId: ID!, authorId: ID!): Review!,
    deleteReview(id: ID!): Review!,
    createAuthor(name: String!, verified: Boolean!): Author!,
    updateAuthor(id: ID!, name: String!, verified: Boolean!): Author!,
    deleteAuthor(id: ID!): Author!,
  }
`

// ======== 5 basic types ========
// String
// Int
// Float
// Boolean
// ID -> unique identifier