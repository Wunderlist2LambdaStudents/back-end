const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConnection')

afterEach(async () => {
  await db('user').truncate()
})

describe('testing tests', () => {
  it('can test tests', () => {
    expect(true).toBeTruthy()
  })
})

describe('POST /auth/register', () => {
  const userAccount = {
    username: 'test1',
    password: 'test'
  }

  it('can add a new user', () => {
    return supertest(server).post('/auth/register')
      .send(userAccount)
      .expect(201)
  })
})

describe('POST /auth/login', () => {
  const userAccount = {
    username: 'test1',
    password: 'test'
  }

  it('can log a user in', () => {
    return supertest(server).post('/auth/register')
      .send(userAccount)
      .expect(201)
      .then(res => {
        return supertest(server).post('/auth/login')
          .send(userAccount)
          .expect(200)
          .then(resp => {
            const token = resp.body.token
            expect(token).toBeTruthy()
          })
        })
  })
})