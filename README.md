# TS-GraphQL-Server

A TypeScript GraphQL server using Express and the reference `graphql` library.

## Quick Start

```bash
npm ci
npm test
npm run build && npm start
```

## Docker

```bash
docker build -t ts-graphql-server .
docker run -p 3000:3000 ts-graphql-server
```

## Query Example

```bash
curl -X POST http://localhost:3000/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query": "{ user(id: \"1\") { name email } }"}'
```
