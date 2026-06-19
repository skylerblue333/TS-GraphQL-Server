import express from 'express';
import { buildSchema, graphql } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
    user(id: ID!): User
  }
  type User {
    id: ID!
    name: String!
    email: String!
  }
`);

const users: Record<string, { id: string; name: string; email: string }> = {
  '1': { id: '1', name: 'Alice', email: 'alice@example.com' },
  '2': { id: '2', name: 'Bob', email: 'bob@example.com' },
};

const root = {
  hello: () => 'Hello from GraphQL!',
  user: ({ id }: { id: string }) => users[id] || null,
};

const app = express();
app.use(express.json());

app.post('/graphql', async (req, res) => {
  const { query, variables } = req.body;
  const result = await graphql({ schema, source: query, rootValue: root, variableValues: variables });
  res.json(result);
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

if (require.main === module) {
  app.listen(3000, () => console.log('GraphQL server on :3000'));
}

export { app, schema, root };
