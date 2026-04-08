import InputFieldWithName from './InputFieldWithName'

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <InputFieldWithName text="name:" value={newName} onChange={handleNameChange} />
    <InputFieldWithName text="number:" value={newNumber} onChange={handleNumberChange} />

    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm