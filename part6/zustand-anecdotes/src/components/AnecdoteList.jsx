import { useAnecdotes, useAnecdoteActions } from "./store"
import anecdoteService from "../services/anecdotes"
import Filter from "./Filter"

export const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const anecdotesActions = useAnecdoteActions()

    const vote = async (id, votes) => {
        await anecdoteService.addVote(id, votes)
        anecdotesActions.vote(id)
        anecdotesActions.setNotification('Voted Sucessfully!')
    }

    const deleteAnecdote = async (id, votes) => {
        if (votes > 0) {
            anecdotesActions.setNotification('Anecdote has votes and can\'t be deleted!')
            return
        }
        await anecdoteService.deleteAnecdote(id, votes)
        anecdotesActions.delete(id)
        anecdotesActions.setNotification('Deleted Successfully!')
    }

    return (
        <div>
            <Filter />
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.votes)}>vote</button>
                        <button onClick={() => deleteAnecdote(anecdote.id, anecdote.votes)}>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}