const User = require('../models/user')
const jwt = require('jsonwebtoken')

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }

    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(400).json({ error: 'user is required' })
        }

        request.user = user
        next()
    } catch (error) {
        next(error)
    }
}

// Middleware for error handling and unknown endpoints
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}


module.exports = {
    unknownEndpoint,
    errorHandler,
    userExtractor
}