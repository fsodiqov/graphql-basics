import { games, reviews, authors } from './_db.js'

export const resolvers = {
  Query: {
    games: () => games,
    reviews: () => reviews,
    authors: () => authors,
  },
}