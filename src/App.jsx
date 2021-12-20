import './App.css'
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
const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

function App() {
  const [todos, setTodos] = useState(data)
  const [filter, setFilter] = useState(FILTER_VALUES.ALL)

  const todosToShow =
    filter === FILTER_VALUES.ALL
      ? todos
      : filter === FILTER_VALUES.ACTIVE
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed)

  console.log({ todos })

  return (
    <div>
      <TodoInput addTodo={setTodos} />
      <TodoContent>
        {todosToShow.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            completed={item.completed}
            toggleCompleteTodo={setTodos}
          />
        ))}
      </TodoContent>
      <TodoFilters
        filterActive={filter}
        optionLeft={<p>ALL</p>}
        filterBy={setFilter}
        filters={FILTER_VALUES}
        optionRight={<p>Clear all</p>}
      />
    </div>
  )
}

export default App
