const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConnection')

afterEach(async () => {
    await db('user').truncate()
    await db('todo').truncate()
})

describe('GET /todo/', () => {
    const userAccount = { username: 'test00', password: 'test' }
  
    it('makes sure the user can access the /todo route', () => {
      return supertest(server).post('/auth/register')
        .send(userAccount)
        .expect(201)
        .then(res => {
          const token = res.body.token
          expect(token).toBeTruthy()
          return supertest(server).get('/todo/')
            .set('authorization', token)
            .expect(200)
        })
    })
})

describe('POST /todo/add', () => {
    const user = { username: 'test123', password: 'test' }

    it('adds a todo for the specified user', () => {
      return supertest(server).post('/auth/register')
        .send(user)
        .expect(201)
        .then(res => {
            const { uuid, token } = res.body
            expect(token).toBeTruthy()
            return supertest(server).post('/todo/add')
                .set('authorization', token)
                .send({
                    uuid,
                    title: 'test',
                    body: 'test',
                    due_date: 121212121212,
                    recurring: 'none'
                })
                .expect(201)
                .then(resp => {
                    expect(resp.body).toBeTruthy()
                })
        })
    })
})

describe('POST /todo/fetch/:id', () => {
    const user = { username: 'test123', password: 'test' }

    it('gets a specified users todos', () => {
        return supertest(server).post('/auth/register')
          .send(user)
          .expect(201)
          .then(res => {
              const { uuid, token } = res.body
              expect(token).toBeTruthy()
              return supertest(server).post('/todo/add')
                  .set('authorization', token)
                  .send({
                      uuid,
                      title: 'test',
                      body: 'test',
                      due_date: 121212121212,
                      recurring: 'none'
                  })
                  .expect(201)
                  .then(resp => {
                        expect(resp.body).toBeTruthy()
                        const uuid = resp.body.todo.user_uuid
                        return supertest(server).get(`/todo/fetch/${uuid}`)
                            .set('authorization', token)
                            .expect(200)
                            .then(todos => {
                                expect(todos.body.length).toBeTruthy()
                            })
                  })
          })
      })
})

describe('POST /todo/edit/:id', () => {
    const user = { username: 'test123', password: 'test' }

    it('can edit a todo by location_id', () => {
        return supertest(server).post('/auth/register')
          .send(user)
          .expect(201)
          .then(res => {
              const { uuid, token } = res.body
              expect(token).toBeTruthy()
              return supertest(server).post('/todo/add')
                  .set('authorization', token)
                  .send({
                      uuid,
                      title: 'test',
                      body: 'test',
                      due_date: 121212121212,
                      recurring: 'none'
                  })
                  .expect(201)
                  .then(resp => {
                        expect(resp.body).toBeTruthy()
                        const id = resp.body.location_id
                        return supertest(server).post(`/todo/edit/${id}`)
                            .set('authorization', token)
                            .send({ title: 'test2' })
                            .expect(200)
                            .then(todos => {
                                expect(todos.body.title).toBe('test2')
                            })
                  })
          })
    })
})

describe('POST /todo/remove/:id', () => {
    const user = { username: 'test123', password: 'test' }

    it('can remove a todo by location_id', () => {
        return supertest(server).post('/auth/register')
          .send(user)
          .expect(201)
          .then(res => {
              const { uuid, token } = res.body
              expect(token).toBeTruthy()
              return supertest(server).post('/todo/add')
                  .set('authorization', token)
                  .send({
                      uuid,
                      title: 'test',
                      body: 'test',
                      due_date: 121212121212,
                      recurring: 'none'
                  })
                  .expect(201)
                  .then(resp => {
                        expect(resp.body).toBeTruthy()
                        const id = resp.body.location_id
                        return supertest(server).delete(`/todo/remove/${id}`)
                            .set('authorization', token)
                            .expect(200)
                            .then(todos => {
                                expect(todos.body).toBeTruthy()
                            })
                  })
          })
    })
})