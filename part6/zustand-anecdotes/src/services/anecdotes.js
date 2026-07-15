const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await fetch(baseURL)
    if (!res.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    return res.json()
}

const createNew = async (content) => {
    const res = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 })
    })
    return res.json()
}

const addVote = async (id, votes) => {
    const res = await fetch(`${baseURL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ votes: votes + 1 })
    })
    return res.json()
}

const deleteAnecdote = async (id, votes) => {
    if (votes > 0) {
        return
    }
    const res = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ votes: votes + 1 })
    })
    return res.json()
}

export default { getAll, createNew, addVote, deleteAnecdote }
