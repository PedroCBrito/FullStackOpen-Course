import { useAnecdoteActions } from "./store"
import anecdoteService from "../services/anecdotes"

export const AnecdoteForm = () => {
    const anecdotesActions = useAnecdoteActions()

    const addAnecdote = e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        if (!content) {
            return
        }

        anecdotesActions.create(content)
        anecdoteService.createNew(content)
        anecdotesActions.setNotification('Created Successfully!')
        e.target.reset()
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