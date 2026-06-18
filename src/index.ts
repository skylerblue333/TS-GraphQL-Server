import { ApolloServer, gql } from 'apollo-server';

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
  }
`;

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

const posts = [
  { id: '101', title: 'GraphQL Intro', content: 'Learning GraphQL...', authorId: '1' },
  { id: '102', title: 'Advanced TS', content: 'TypeScript tips...', authorId: '2' },
];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, { id }: { id: string }) => users.find(u => u.id === id),
    posts: () => posts,
  },
  User: {
    posts: (parent: any) => posts.filter(p => p.authorId === parent.id),
  },
  Post: {
    author: (parent: any) => users.find(u => u.id === parent.authorId),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
});