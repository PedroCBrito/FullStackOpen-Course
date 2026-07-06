import { useAnecdotes, useAnecdoteActions } from "./store"

export const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const anecdotesActions = useAnecdoteActions()

    const vote = id => {
        anecdotesActions.vote(id)
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}   