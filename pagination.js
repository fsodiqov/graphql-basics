export function paginate(items, { page = 1, pageSize = 10, sortOrder = 'ASC', sortKey = 'id' }) {
  const sorted = [...items].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortOrder === 'DESC' ? -cmp : cmp
  })

  const totalCount = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: sorted.slice(start, start + pageSize),
    totalCount,
    page: safePage,
    pageSize,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  }
}
