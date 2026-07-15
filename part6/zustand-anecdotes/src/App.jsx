import { useEffect } from "react"
import anecdoteService from "./services/anecdotes"
import { useAnecdoteActions } from "./components/store"
import { AnecdoteList } from "./components/AnecdoteList"
import { AnecdoteForm } from "./components/AnecdoteForm"
import Notification from "./components/Notification"

const App = () => {
    const anecdotesActions = useAnecdoteActions()
    useEffect(() => {
        anecdoteService.getAll().then(anecdotes => {
            anecdotesActions.initializeAnecdotes(anecdotes)
        })
    }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App