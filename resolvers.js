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
}