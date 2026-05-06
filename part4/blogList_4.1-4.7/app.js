const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const middlewareFunction = require('./utils/middleware')
const logger = require('./utils/logger')

const password = process.env.DATABASEPASSWORD;

const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0.miewobe.mongodb.net/?appName=Cluster0`

mongoose.connect(mongoUrl)
            .then(() => {
            logger.info('connected to MongoDB')
            })
            .catch((error) => {
            logger.error('error connecting to MongoDB:', error.message)
            })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middlewareFunction.unknownEndpoint)
app.use(middlewareFunction.errorHandler)

module.exports = app