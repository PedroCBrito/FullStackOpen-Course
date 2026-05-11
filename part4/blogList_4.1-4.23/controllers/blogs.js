const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      ...body,
      user: user
    })

    const savedBlog = await blog.save()
    savedBlog.user = undefined
    user.blogs.push(savedBlog.toObject())
    await user.save()
    
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete a blog' })
    }

    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter