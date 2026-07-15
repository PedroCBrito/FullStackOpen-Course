import { useAnecdoteActions } from "./store"

const Filter = () => {
  const anecdotesActions = useAnecdoteActions()

  const handleChange = (event) => {
    anecdotesActions.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter