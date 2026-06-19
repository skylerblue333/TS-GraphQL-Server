# TS-GraphQL-Server

![CI](https://github.com/skylerblue333/TS-GraphQL-Server/workflows/CI/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg)
![Redis](https://img.shields.io/badge/Redis-Streams-DC382D.svg)

A robust GraphQL API Gateway serving as the primary data graph for web and mobile clients, featuring GraphiQL introspection and mutation handling.

## System Architecture


```mermaid
graph TD
    Client[Web/Mobile Client] -->|WebSocket/WSS| Gateway[Node.js Gateway]
    Client -->|GraphQL| Gateway
    Gateway -->|Redis Pub/Sub| Cache[(Redis Streams)]
    Gateway -->|Prisma| DB[(PostgreSQL)]
    Cache --> Worker[Background Processor]
```


## Elite Features
- **Strongly Typed Schema**: Native GraphQL schema definition.
- **Federation Ready**: Structured to support Apollo Federation.
- **GraphiQL Interface**: Built-in developer tooling for query testing.

## Quick Start
```bash
docker-compose up -d redis
npm ci
npm test
npm run build && npm start
```
