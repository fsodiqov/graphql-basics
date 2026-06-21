import { games, reviews, authors } from './_db.js'
import { pubsub, EVENTS } from './pubsub.js'
import { paginate } from './pagination.js'

const matchId = (a, b) => String(a) === String(b)

const nextId = (items) =>
  items.length ? Math.max(...items.map((item) => Number(item.id))) + 1 : 1

const findById = (items, id) => items.find((item) => matchId(item.id, id))

const removeById = (items, id) => {
  const index = items.findIndex((item) => matchId(item.id, id))
  if (index === -1) return null
  return items.splice(index, 1)[0]
}

const ratingToLevel = (rating) => {
  if (rating <= 1) return 'TERRIBLE'
  if (rating === 2) return 'BAD'
  if (rating === 3) return 'AVERAGE'
  if (rating === 4) return 'GOOD'
  return 'EXCELLENT'
}

const toPageInfo = (result) => ({
  totalCount: result.totalCount,
  page: result.page,
  pageSize: result.pageSize,
  totalPages: result.totalPages,
  hasNextPage: result.hasNextPage,
  hasPreviousPage: result.hasPreviousPage,
})

const assertGameExists = (gameId) => {
  const game = findById(games, gameId)
  if (!game) throw new Error('Game not found')
  return game
}

const assertAuthorExists = (authorId) => {
  const author = findById(authors, authorId)
  if (!author) throw new Error('Author not found')
  return author
}

export const resolvers = {
  Query: {
    games: () => games,
    game: (_parent, args) => findById(games, args.id),
    gamesPaginated: (_parent, args) => {
      const { page, pageSize, sortOrder } = args.pagination ?? {}
      const result = paginate(games, { page, pageSize, sortOrder, sortKey: 'title' })
      return { items: result.items, pageInfo: toPageInfo(result) }
    },
    reviews: () => reviews,
    review: (_parent, args) => findById(reviews, args.id),
    reviewsPaginated: (_parent, args) => {
      const { page, pageSize, sortOrder } = args.pagination ?? {}
      const filtered = args.minRating
        ? reviews.filter((review) => review.rating >= args.minRating)
        : reviews
      const result = paginate(filtered, { page, pageSize, sortOrder, sortKey: 'rating' })
      return { items: result.items, pageInfo: toPageInfo(result) }
    },
    authors: () => authors,
    author: (_parent, args) => findById(authors, args.id),
    authorsPaginated: (_parent, args) => {
      const { page, pageSize, sortOrder } = args.pagination ?? {}
      const result = paginate(authors, { page, pageSize, sortOrder, sortKey: 'name' })
      return { items: result.items, pageInfo: toPageInfo(result) }
    },
  },
  Game: {
    reviews: (parent) => reviews.filter((review) => matchId(review.gameId, parent.id)),
  },
  Review: {
    ratingLevel: (parent) => ratingToLevel(parent.rating),
    game: (parent) => findById(games, parent.gameId),
    author: (parent) => findById(authors, parent.authorId),
  },
  Author: {
    reviews: (parent) => reviews.filter((review) => matchId(review.authorId, parent.id)),
  },
  Mutation: {
    createGame: (_parent, { input }) => {
      const game = { id: nextId(games), ...input }
      games.push(game)
      pubsub.publish(EVENTS.GAME_ADDED, { gameAdded: game })
      return game
    },
    updateGame: (_parent, { input }) => {
      const game = findById(games, input.id)
      if (!game) throw new Error('Game not found')
      game.title = input.title
      game.players = input.players
      game.genre = input.genre
      pubsub.publish(EVENTS.GAME_UPDATED, { gameUpdated: game })
      return game
    },
    deleteGame: (_parent, args) => {
      const game = removeById(games, args.id)
      if (!game) throw new Error('Game not found')
      pubsub.publish(EVENTS.GAME_DELETED, { gameDeleted: game })
      return game
    },
    createReview: (_parent, { input }) => {
      assertGameExists(input.gameId)
      assertAuthorExists(input.authorId)
      const review = {
        id: nextId(reviews),
        rating: input.rating,
        content: input.content,
        gameId: Number(input.gameId),
        authorId: Number(input.authorId),
      }
      reviews.push(review)
      pubsub.publish(EVENTS.REVIEW_ADDED, { reviewAdded: review })
      return review
    },
    updateReview: (_parent, { input }) => {
      const review = findById(reviews, input.id)
      if (!review) throw new Error('Review not found')
      assertGameExists(input.gameId)
      assertAuthorExists(input.authorId)
      review.rating = input.rating
      review.content = input.content
      review.gameId = Number(input.gameId)
      review.authorId = Number(input.authorId)
      pubsub.publish(EVENTS.REVIEW_UPDATED, { reviewUpdated: review })
      return review
    },
    deleteReview: (_parent, args) => {
      const review = removeById(reviews, args.id)
      if (!review) throw new Error('Review not found')
      pubsub.publish(EVENTS.REVIEW_DELETED, { reviewDeleted: review })
      return review
    },
    createAuthor: (_parent, { input }) => {
      const author = { id: nextId(authors), ...input }
      authors.push(author)
      pubsub.publish(EVENTS.AUTHOR_ADDED, { authorAdded: author })
      return author
    },
    updateAuthor: (_parent, { input }) => {
      const author = findById(authors, input.id)
      if (!author) throw new Error('Author not found')
      author.name = input.name
      author.verified = input.verified
      pubsub.publish(EVENTS.AUTHOR_UPDATED, { authorUpdated: author })
      return author
    },
    deleteAuthor: (_parent, args) => {
      const author = removeById(authors, args.id)
      if (!author) throw new Error('Author not found')
      pubsub.publish(EVENTS.AUTHOR_DELETED, { authorDeleted: author })
      return author
    },
  },
  Subscription: {
    gameAdded: {
      subscribe: () => pubsub.asyncIterator([EVENTS.GAME_ADDED]),
    },
    gameUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.GAME_UPDATED]),
    },
    gameDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.GAME_DELETED]),
    },
    reviewAdded: {
      subscribe: () => pubsub.asyncIterator([EVENTS.REVIEW_ADDED]),
    },
    reviewUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.REVIEW_UPDATED]),
    },
    reviewDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.REVIEW_DELETED]),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator([EVENTS.AUTHOR_ADDED]),
    },
    authorUpdated: {
      subscribe: () => pubsub.asyncIterator([EVENTS.AUTHOR_UPDATED]),
    },
    authorDeleted: {
      subscribe: () => pubsub.asyncIterator([EVENTS.AUTHOR_DELETED]),
    },
  },
}
