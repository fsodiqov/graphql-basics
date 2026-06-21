export const typeDefs = `#graphql
  enum SortOrder {
    ASC
    DESC
  }

  enum GameGenre {
    RPG
    ACTION
    ADVENTURE
    STRATEGY
    OTHER
  }

  enum RatingLevel {
    TERRIBLE
    BAD
    AVERAGE
    GOOD
    EXCELLENT
  }

  type Game {
    id: ID!
    title: String!
    players: [String!]!
    genre: GameGenre!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    ratingLevel: RatingLevel!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!
  }

  type PageInfo {
    totalCount: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type PaginatedGames {
    items: [Game!]!
    pageInfo: PageInfo!
  }

  type PaginatedReviews {
    items: [Review!]!
    pageInfo: PageInfo!
  }

  type PaginatedAuthors {
    items: [Author!]!
    pageInfo: PageInfo!
  }

  input CreateGameInput {
    title: String!
    players: [String!]!
    genre: GameGenre!
  }

  input UpdateGameInput {
    id: ID!
    title: String!
    players: [String!]!
    genre: GameGenre!
  }

  input CreateReviewInput {
    rating: Int!
    content: String!
    gameId: ID!
    authorId: ID!
  }

  input UpdateReviewInput {
    id: ID!
    rating: Int!
    content: String!
    gameId: ID!
    authorId: ID!
  }

  input CreateAuthorInput {
    name: String!
    verified: Boolean!
  }

  input UpdateAuthorInput {
    id: ID!
    name: String!
    verified: Boolean!
  }

  input PaginationInput {
    page: Int = 1
    pageSize: Int = 10
    sortOrder: SortOrder = ASC
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    gamesPaginated(pagination: PaginationInput): PaginatedGames!
    reviews: [Review]
    review(id: ID!): Review
    reviewsPaginated(pagination: PaginationInput, minRating: Int): PaginatedReviews!
    authors: [Author]
    author(id: ID!): Author
    authorsPaginated(pagination: PaginationInput): PaginatedAuthors!
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game!
    updateGame(input: UpdateGameInput!): Game!
    deleteGame(id: ID!): Game!
    createReview(input: CreateReviewInput!): Review!
    updateReview(input: UpdateReviewInput!): Review!
    deleteReview(id: ID!): Review!
    createAuthor(input: CreateAuthorInput!): Author!
    updateAuthor(input: UpdateAuthorInput!): Author!
    deleteAuthor(id: ID!): Author!
  }

  type Subscription {
    gameAdded: Game!
    gameUpdated: Game!
    gameDeleted: Game!
    reviewAdded: Review!
    reviewUpdated: Review!
    reviewDeleted: Review!
    authorAdded: Author!
    authorUpdated: Author!
    authorDeleted: Author!
  }
`
