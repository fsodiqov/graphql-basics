export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!,
    players: [String!]!, 
  }
  type Review {
    id: ID!
    rating: Int!,
    content: String!,
  }
  type Author {
    id: ID!
    name: String!, 
    verified: Boolean!,
  }
  type Query {
    games: [Game],
    game(id: ID!): Game,
    reviews: [Review],
    review(id: ID!): Review,
    authors: [Author],
    author(id: ID!): Author,
  }
`

// ======== 5 basic types ========
// String
// Int
// Float
// Boolean
// ID -> unique identifier