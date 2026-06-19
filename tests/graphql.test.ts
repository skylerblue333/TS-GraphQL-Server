import request from 'supertest';
import { app } from '../src/index';

describe('GraphQL Server', () => {
  it('resolves hello query', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({ query: '{ hello }' });
    expect(res.status).toBe(200);
    expect(res.body.data.hello).toBe('Hello from GraphQL!');
  });

  it('resolves user by id', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({ query: '{ user(id: "1") { name email } }' });
    expect(res.body.data.user.name).toBe('Alice');
  });

  it('returns null for unknown user', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({ query: '{ user(id: "999") { name } }' });
    expect(res.body.data.user).toBeNull();
  });
});
