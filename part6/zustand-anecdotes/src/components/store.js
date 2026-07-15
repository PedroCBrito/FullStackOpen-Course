import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
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

    filterChange: (filter) => {
      console.log(filter);
      return set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.toLowerCase().includes(filter.toLowerCase()))
      }))
    },

    setNotification: (message, durationSeconds = 5) => {
      set({ notification: message })
      setTimeout(() => set({ notification: null }), durationSeconds * 1000)
    }
  },
}))


export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useAnecdoteStore((state) => state.notification)
