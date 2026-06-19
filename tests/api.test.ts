import request from 'supertest';
import app from '../src/index';

describe('GraphQL API Gateway', () => {
  it('REST /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  it('Executes GraphQL Query: getUser', async () => {
    const query = `
      query {
        getUser(id: "1") {
          username
          reputationScore
        }
      }
    `;
    const res = await request(app)
      .post('/graphql')
      .send({ query });
      
    expect(res.status).toBe(200);
    expect(res.body.data.getUser.username).toBe('alice_eth');
  });

  it('Executes GraphQL Mutation: upgradeUser', async () => {
    const mutation = `
      mutation {
        upgradeUser(id: "1") {
          isPremium
        }
      }
    `;
    const res = await request(app)
      .post('/graphql')
      .send({ query: mutation });
      
    expect(res.status).toBe(200);
    expect(res.body.data.upgradeUser.isPremium).toBe(true);
  });
});
