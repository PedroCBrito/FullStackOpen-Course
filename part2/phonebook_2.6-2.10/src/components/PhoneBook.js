import { useEffect, useState } from 'react'
import Title from './Title'
import InputFieldWithName from './InputFieldWithName'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import PhoneBookService from '../services/PhoneBookService'

const PhoneBook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const addNewPerson = (event) => {
        event.preventDefault()

        const personFound = persons.find((person) => person.name === newName)
        if (personFound) {
            updatePerson(personFound)
            return
        }

        const newPerson = { name: newName, number: newNumber }
        PhoneBookService.create(newPerson).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        })
    }

    const updatePerson = (personFound) => {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const updatedPerson = { ...personFound, number: newNumber }
            PhoneBookService.update(personFound.id, updatedPerson)
                .then((returnedPerson) => {
                    setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
                })
                .catch((error) => {
                    alert('Failed to update the person. Please try again.', error)
                })
            setNewName('')
            setNewNumber('')

        }
    }

    const searchByPersonName = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onDeletePerson = (id) => {
        if (window.confirm('Are you sure you want to delete this person?')) {
            PhoneBookService.del(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id))
                })
                .catch((error) => {
                    alert('Failed to delete the person. Please try again.', error)
                })
        }
    }

    const handleNameChange = ({ target }) => setNewName(target.value)
    const handleNumberChange = ({ target }) => setNewNumber(target.value)

    useEffect(() => {
        PhoneBookService.getAll().then((initialPersons) => { setPersons(initialPersons) })
    }, [])


    return (
        <div>
            <Title text="Phonebook" />
            <InputFieldWithName text="filter shown with" value={searchTerm} onChange={searchByPersonName} />

            <Title text="add a new" />
            <PersonForm onSubmit={addNewPerson} newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange} />

            <Title text="Numbers" />
            <PersonList persons={filteredPersons} onDeletePerson={onDeletePerson} />
        </div>
    )
}

export default PhoneBook