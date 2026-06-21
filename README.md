# GraphQL Basics

> **GraphQL** is a modern query language for APIs. It can be used instead of or alongside REST, and lets clients request exactly the data they need.

---

## What is GraphQL?

**GraphQL** is a query language and runtime developed by Facebook (now Meta) in 2012 and open-sourced in 2015. It makes data exchange between server and client simple and flexible.

In REST, each resource typically has its own endpoint (`/users`, `/posts`, `/comments`). With GraphQL, you use a **single endpoint** to request precisely the data you need.

```
REST:     GET /users/1
          GET /users/1/posts
          GET /posts/5/comments   → 3 requests

GraphQL:  POST /graphql
          { user(id: 1) { name, posts { title, comments { text } } } }
          → 1 request
```

---

## Core Concepts

| Concept | Purpose |
|---------|---------|
| **Schema** | The API "contract" — what data exists and how it can be queried |
| **Query** | **Read** data |
| **Mutation** | **Write/update** data (CREATE, UPDATE, DELETE) |
| **Subscription** | Real-time data updates (via WebSocket) |
| **Resolver** | A function that defines where to fetch data for each field |
| **Type** | Data structure (`User`, `Post`, `Comment`, etc.) |

---

## GraphQL vs REST

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Many (`/users`, `/posts`...) | One (`/graphql`) |
| Data size | Server decides (over-fetching) | Client decides |
| Number of requests | Many (N+1 problem) | Few (multiple resources in one request) |
| Documentation | Swagger/OpenAPI | Self-documenting schema |
| Learning curve | Easier to start | Slightly steeper, but more powerful |

---

## Simple Example

```graphql
# Query
query {
  user(id: "1") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# Response
{
  "data": {
    "user": {
      "name": "Ali",
      "email": "ali@example.com",
      "posts": [
        { "title": "About GraphQL", "createdAt": "2025-01-15" }
      ]
    }
  }
}
```

---

## Why GraphQL?

- **No over-fetching** — request only the fields you need
- **No under-fetching** — fetch related data in a single request
- **Strong typing** — the schema catches errors early
- **Modern ecosystem** — Apollo, Relay, Hasura, Prisma, and more

---

## What We'll Build in This Repo

This repository is for hands-on practice with GraphQL fundamentals. Step by step, we'll cover:

- [ ] Writing a GraphQL schema
- [ ] Creating queries and mutations
- [ ] Resolver functions
- [ ] Building a server with Apollo Server
- [ ] Sending requests from a client

---

## Useful Links

- [GraphQL official website](https://graphql.org)
- [GraphQL specification](https://spec.graphql.org)
- [Apollo Server docs](https://www.apollographql.com/docs/apollo-server/)
- [How to GraphQL](https://www.howtographql.com) — free tutorial

---

## Author

A practice project created while learning GraphQL.
