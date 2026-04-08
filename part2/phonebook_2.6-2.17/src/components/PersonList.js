import DeletePersonButton from "./DeletePersonButton"

const PersonList = ({ persons, onDeletePerson }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <DeletePersonButton person={person} onDelete={onDeletePerson} />
      </p>
    ))}
  </div>
)

export default PersonList