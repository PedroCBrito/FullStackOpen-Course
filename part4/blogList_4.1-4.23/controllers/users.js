const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    if (!body.password || body.password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    if (!body.username || body.username.length < 3) {
      return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }

    const existingUser = await User.findOne({ username: body.username })
    if (existingUser) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: bcryptjs.hashSync(body.password, 10)
    })

    const savedUser = await user.save()
    savedUser.passwordHash = undefined
    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter