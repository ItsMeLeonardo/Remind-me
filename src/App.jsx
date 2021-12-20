import './App.css'
import TodoSearch from './components/TodoSearch'
import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import { useState } from 'react'

const data = [
  {
    id: 1,
    text: 'Learn React',
    completed: false,
  },
  {
    id: 2,
    text: 'Learn Redux',
    completed: false,
  },
  {
    id: 3,
    text: 'Learn React Router',
    completed: false,
  },
]

function App() {
  const [todos, setTodos] = useState(data)

  return (
    <div>
      <TodoInput addTodo={setTodos} />
      <TodoContent>
        {todos.map((item) => (
          <TodoItem key={item.id} todo={item.text} completed={item.completed} />
        ))}
      </TodoContent>
      <TodoFilters />
    </div>
  )
}

export default App
