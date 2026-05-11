const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api.post('/api/users').send({
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
    })
})


test('login with valid credentials', async () => {
    const response = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'testpassword'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
})

test('login with invalid credentials', async () => {
    await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'wrongpassword'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})