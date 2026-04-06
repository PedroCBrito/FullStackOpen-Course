import { useState } from 'react'


const Title = ({ text }) => <h2>{text}</h2>

const PhoneBookDisplay = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
)

const InputFieldWithName = ({ text, value, onChange }) => (
  <div>
    {text} <input value={value} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <InputFieldWithName text="name:" value={newName} onChange={handleNameChange} />
    <InputFieldWithName text="number:" value={newNumber} onChange={handleNumberChange} />

    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    setNewName('')
    setNewNumber('')
  }

  const searchByPersonName = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNameChange = ({ target }) => setNewName(target.value)
  const handleNumberChange = ({ target }) => setNewNumber(target.value)

  return (
    <div>
      <Title text="Phonebook" />
      <InputFieldWithName text="filter shown with" value={searchTerm} onChange={searchByPersonName} />

      <Title text="add a new" />
      <PersonForm onSubmit={addNewPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

      <Title text="Numbers" />
      <PhoneBookDisplay persons={filteredPersons} />

    </div>
  )
}

export default App