const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token

const authHeader = () => ({
    Authorization: `Bearer ${token}`
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api.post('/api/users').send({
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
    })

    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'testuser',
            password: 'testpassword'
        })

    token = loginResponse.body.token

    const initialBlogs = [
        {
            title: 'First Blog',
            author: 'Author One',
            url: 'http://firstblog.com',
            likes: 1
        },
        {
            title: 'Second Blog',
            author: 'Author Two',
            url: 'http://secondblog.com',
            likes: 2
        }
    ]

    for (const blog of initialBlogs) {
        await api
            .post('/api/blogs')
            .set(authHeader())
            .send(blog)
    }
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api
        .get('/api/blogs')
        .set(authHeader())
    const blogs = response.body

    blogs.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const numberOfBlogsBefore = (await api.get('/api/blogs').set(authHeader())).body.length

    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://testblog.com',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
        .set(authHeader())
    const blogs = response.body

    const titles = blogs.map(blog => blog.title)
    expect(titles).toContain('Test Blog')

    expect(blogs.length).toBe(numberOfBlogsBefore + 1)
})

test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
        title: 'Blog Without Likes',
        author: 'Author',
        url: 'http://blogwithoutlikes.com'
    }

    const response = await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
})

test('if title and url properties are missing, responds with status code 400', async () => {
    //Missing url
    const newBlog = {
        title: 'Blog Without URL',
        author: 'Author',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog)
        .expect(400)

    //Missing title
    const newBlog2 = {
        author: 'Author',
        url: 'http://blogwithouturl.com',
        likes: 0
    }    

    await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog2)
        .expect(400)
})

test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
    const numberOfBlogsBeforeActions = (await api.get('/api/blogs').set(authHeader())).body.length

    const newBlog = {
        title: 'Blog to be Deleted',
        author: 'Author',
        url: 'http://blogtobedeleted.com',
        likes: 0
    }

    const postResponse = await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogId = postResponse.body.id

    await api
        .delete(`/api/blogs/${blogId}`)
        .set(authHeader())
        .expect(204)

    const getResponse = await api
        .get('/api/blogs')
        .set(authHeader())
    const blogs = getResponse.body

    const ids = blogs.map(blog => blog.id)
    expect(ids).not.toContain(blogId)

    expect(blogs.length).toBe(numberOfBlogsBeforeActions)
})

test('updating a blog\'s likes succeeds with status code 200 if id is valid', async () => {
    const newBlog = {
        title: 'Blog to be Updated',
        author: 'Author',
        url: 'http://blogtobeupdated.com',
        likes: 0
    }

    const postResponse = await api
        .post('/api/blogs')
        .set(authHeader())
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogId = postResponse.body.id

    const updatedBlog = {
        title: 'Blog to be Updated',
        author: 'Author',
        url: 'http://blogtobeupdated.com',
        likes: 5
    }

    await api
        .put(`/api/blogs/${blogId}`)
        .set(authHeader())
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const getResponse = await api
        .get('/api/blogs')
        .set(authHeader())
    const blogs = getResponse.body

    const updatedBlogEntry = blogs.find(blog => blog.id === blogId)
    expect(updatedBlogEntry.likes).toBe(5)
})

afterAll(() => {
    mongoose.connection.close()
})
