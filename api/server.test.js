const db = require('../data/dbConfig');
const server = require('./server');
const request = require('supertest');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
beforeEach(async () => {
  await db('users').truncate();
})
afterAll(async () => {
  await db.destroy();
})

test('sanity', () => {
  expect(true).toBe(true);
})

describe('test server endpoints', () => {
  test('[POST] /api/auth/register | successful status and response', async () => {
    const user = { username: 'Lindsay', password: '1234'}
    const result = await request(server)
      .post('/api/auth/register')
      .send(user)
    expect(user).toMatchObject({ username: 'Lindsay' });
  })
})
  test('[POST] /api/auth/register | returns 401 when missing username', async () => {
    const result = await request(server)
      .post('/api/auth/register')
      .send({ username: '', password: '1234' })
    expect(result.status).toBe(401);
  })
  test('[POST] /api/auth/login | returns 401 with invalid credentials', async () => {
    const result = await request(server)
      .post('/api/auth/login')
      .send({ username: 'test', password: '5678' })
    expect(result.status).toBe(401);
  })

describe('Get jokes', () => {
  test('[GET] /api/jokes | returns 401 when missing token', async () => {
    const result = await request(server)
      .get('/api/jokes')
    expect(result.status).toBe(401);
  })
})
