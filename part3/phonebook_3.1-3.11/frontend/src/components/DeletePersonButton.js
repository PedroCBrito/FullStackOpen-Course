const DeletePersonButton = ({ person, onDelete}) => {
    return (
        <button onClick={() => onDelete(person.id)}>delete</button>
    )
}
export default DeletePersonButton