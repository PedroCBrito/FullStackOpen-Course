import { useAnecdoteActions } from "./store"

export const AnecdoteForm = () => {
    const anecdotesActions = useAnecdoteActions()

    const addAnecdote = e => {
        e.preventDefault()
        anecdotesActions.create(e.target.anecdote.value)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote} >
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}