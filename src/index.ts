import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { z } from 'zod';

const app = express();

// GraphQL Schema
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    reputationScore: Float!
    isPremium: Boolean!
  }

  type Query {
    health: String!
    getUser(id: ID!): User
    getTrendingUsers(limit: Int): [User!]!
  }

  type Mutation {
    upgradeUser(id: ID!): User!
  }
`);

// Mock DB
const db = new Map([
  ['1', { id: '1', username: 'alice_eth', reputationScore: 98.5, isPremium: false }],
  ['2', { id: '2', username: 'bob_builder', reputationScore: 85.0, isPremium: true }]
]);

// Resolvers
const root = {
  health: () => 'GraphQL Gateway Operational',
  getUser: ({ id }: { id: string }) => db.get(id),
  getTrendingUsers: ({ limit = 10 }: { limit: number }) => {
    return Array.from(db.values())
      .sort((a, b) => b.reputationScore - a.reputationScore)
      .slice(0, limit);
  },
  upgradeUser: ({ id }: { id: string }) => {
    const user = db.get(id);
    if (!user) throw new Error('User not found');
    user.isPremium = true;
    db.set(id, user);
    return user;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/health', (req, res) => res.json({ status: 'healthy', service: 'graphql-gateway' }));

if (require.main === module) {
  app.listen(4000, () => console.log('GraphQL Gateway running on port 4000/graphql'));
}

export default app;
