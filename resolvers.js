import { games, reviews, authors } from './_db.js'

const matchId = (a, b) => String(a) === String(b)

const nextId = (items) =>
  items.length ? Math.max(...items.map((item) => Number(item.id))) + 1 : 1

const findById = (items, id) => items.find((item) => matchId(item.id, id))

const removeById = (items, id) => {
  const index = items.findIndex((item) => matchId(item.id, id))
  if (index === -1) return null
  return items.splice(index, 1)[0]
}

export const resolvers = {
  Query: {
    games: () => games,
    game: (_parent, args) => findById(games, args.id),
    reviews: () => reviews,
    review: (_parent, args) => findById(reviews, args.id),
    authors: () => authors,
    author: (_parent, args) => findById(authors, args.id),
  },
  Game: {
    reviews: (parent) => reviews.filter((review) => matchId(review.gameId, parent.id)),
  },
  Review: {
    game: (parent) => findById(games, parent.gameId),
    author: (parent) => findById(authors, parent.authorId),
  },
  Author: {
    reviews: (parent) => reviews.filter((review) => matchId(review.authorId, parent.id)),
  },
  Mutation: {
    createGame: (_parent, args) => {
      const game = { id: nextId(games), ...args }
      games.push(game)
      return game
    },
    createReview: (_parent, args) => {
      const review = {
        id: nextId(reviews),
        rating: args.rating,
        content: args.content,
        gameId: Number(args.gameId),
        authorId: Number(args.authorId),
      }
      reviews.push(review)
      return review
    },
    createAuthor: (_parent, args) => {
      const author = { id: nextId(authors), ...args }
      authors.push(author)
      return author
    },
    updateGame: (_parent, args) => {
      const game = findById(games, args.id)
      if (!game) throw new Error('Game not found')
      game.title = args.title
      game.players = args.players
      return game
    },
    deleteGame: (_parent, args) => {
      const game = removeById(games, args.id)
      if (!game) throw new Error('Game not found')
      return game
    },
    updateReview: (_parent, args) => {
      const review = findById(reviews, args.id)
      if (!review) throw new Error('Review not found')
      review.rating = args.rating
      review.content = args.content
      review.gameId = Number(args.gameId)
      review.authorId = Number(args.authorId)
      return review
    },
    deleteReview: (_parent, args) => {
      const review = removeById(reviews, args.id)
      if (!review) throw new Error('Review not found')
      return review
    },
    updateAuthor: (_parent, args) => {
      const author = findById(authors, args.id)
      if (!author) throw new Error('Author not found')
      author.name = args.name
      author.verified = args.verified
      return author
    },
    deleteAuthor: (_parent, args) => {
      const author = removeById(authors, args.id)
      if (!author) throw new Error('Author not found')
      return author
    },
  },
}
