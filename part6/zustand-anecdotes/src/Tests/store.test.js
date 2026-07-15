import { describe, test, expect, beforeEach } from 'vitest'
import { useAnecdoteStore } from '../components/store'

// Initial state to reset the store before each test
const initialState = {
  anecdotes: [],
  filter: '',
  notification: null,
}

const anecdotesInitial = [
  { content: 'Testing 1', id: '1', votes: 0 },
  { content: 'Testing 2', id: '2', votes: 0 },
  { content: 'Testing 3', id: '3', votes: 0 },
]

describe('store tests', () => {
  beforeEach(() => {
    // Reset to a clean initial state before each test
    useAnecdoteStore.setState({
      ...initialState,
      anecdotes: [...anecdotesInitial],
    })
  })

  test('Initialize anecdotes', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.initializeAnecdotes(anecdotesInitial)
    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes).toHaveLength(3)
    expect(anecdotes).toEqual(anecdotesInitial)
  })

  test('Create anecdote', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.create('New anecdote')
    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes).toHaveLength(4)
    const created = anecdotes.find(a => a.content === 'New anecdote')
    expect(created).toBeDefined()
    expect(created.votes).toBe(0)
  })

  test('Vote on anecdote', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.vote('1')
    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes).toHaveLength(3)
    const voted = anecdotes.find(a => a.id === '1')
    expect(voted.votes).toBe(1)
    // others remain unchanged
    const notVoted = anecdotes.find(a => a.id === '2')
    expect(notVoted.votes).toBe(0)
  })

  test('Filter stores filter string (does not remove anecdotes)', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.filterChange('Testing 1')
    const { filter, anecdotes } = useAnecdoteStore.getState()
    expect(filter).toBe('Testing 1')
    // Anecdotes are NOT removed from the store — filtering happens at render time
    expect(anecdotes).toHaveLength(3)
  })

  test('Notification is set and exists in state', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.setNotification('Test notification')
    const { notification } = useAnecdoteStore.getState()
    expect(notification).toBe('Test notification')
  })

  test('Delete anecdote', () => {
    const { actions } = useAnecdoteStore.getState()
    actions.delete('1')
    const { anecdotes } = useAnecdoteStore.getState()
    expect(anecdotes).toHaveLength(2)
    expect(anecdotes.find(a => a.id === '1')).toBeUndefined()
    expect(anecdotes.find(a => a.id === '2')).toBeDefined()
  })
})
