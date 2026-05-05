const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;
const password = process.env.DATABASEPASSWORD;

app.use(express.static('build'))
app.use(cors());
app.use(express.json());

morgan.token('payload', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
});

const url =
    `mongodb+srv://fullstack:${password}@cluster0.miewobe.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'));

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result);
    }).catch(error => next(error));
});

app.get('/info', (req, res) => {
    const date = new Date();
    Person.countDocuments({}).then(count => {
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    });
});

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(id, person, { new: true }).then(updatedPerson => {
        res.json(updatedPerson);
    }).catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number is missing' });
    }

    const newPerson = new Person(body);
    newPerson.save().then(savedPerson => {
        response.json(savedPerson);

    }).catch(error => next(error));

});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end();
    }).catch(error => next(error));

});


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});


// Middleware for error handling and unknown endpoints

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(errorHandler)

module.exports = app;