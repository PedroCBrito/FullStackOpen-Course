const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
})


test('api returns users as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Add new user', async () => {
    await api
        .post('/api/users')
        .send({
            username: 'usertestuser',
            name: 'Test User',
            password: 'testpassword'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Add user with short password', async () => {
    await api
    .post('/api/users')
    .send({
        username: 'shortpassworduser',
        name: 'Short Password User',
        password: 'pw'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('Add user with short username', async () => {
    await api
    .post('/api/users')
    .send({
        username: 'ab',
        name: 'Short Username User',
        password: 'validpassword'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('Add user with existing username', async () => {
    await api
        .post('/api/users')
        .send({
            username: 'duplicateuser',
            name: 'Existing User',
            password: 'validpassword'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
    .post('/api/users')
    .send({
        username: 'duplicateuser',
        name: 'Duplicate Username User',
        password: 'anotherpassword'
    })
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})
