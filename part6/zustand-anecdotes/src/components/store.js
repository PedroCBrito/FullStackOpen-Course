import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  notification: null,
  actions: {
    initializeAnecdotes: anecdotes => set(() => ({ anecdotes })),

    vote: (id) => set(state => ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    })),

    create: (content) => set(state => ({
      anecdotes: state.anecdotes.concat(asObject(content))
    })),

    delete: (id) => set(state => ({
      anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
    })),

    filterChange: (filter) => set(() => ({ filter })),

    setNotification: (message, durationSeconds = 5) => {
      set({ notification: message })
      setTimeout(() => set({ notification: null }), durationSeconds * 1000)
    }
  },
}))


export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useAnecdoteStore((state) => state.notification)
export const useFilter = () => useAnecdoteStore((state) => state.filter)

// Expose the raw store for testing purposes (non-hook access via getState/setState)
export { useAnecdoteStore }
