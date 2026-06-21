import { games, reviews, authors } from './_db.js'

export const resolvers = {
  Query: {
    games: () => games,
    game: (_parent, args) => games.find(game => game.id === args.id),
    reviews: () => reviews, 
    review: (_parent, args) => reviews.find(review => review.id === args.id),
    authors: () => authors,
    author: (_parent, args) => authors.find(author => author.id === args.id),
  },
  Game: {
    reviews: (parent) => reviews.filter(review => review.gameId === parent.id),
  },
  Review: {
    game: (parent) => games.find(game => game.id === parent.gameId),
    author: (parent) => authors.find(author => author.id === parent.authorId),
  },
  Author: {
    reviews: (parent) => reviews.filter(review => review.authorId === parent.id),
  },
}