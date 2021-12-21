import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import { useState } from 'react'
import FilterContent from './components/FilterContent'

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

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    if (newTodos.length !== todos.length) {
      setTodos(newTodos)
    }
  }
  const itemLefts = todos.filter((todo) => !todo.completed).length

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
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

        <FilterContent>
          <p className="text-xs whitespace-nowrap text-gray-500">
            {itemLefts} items left
          </p>
          <TodoFilters
            filterActive={filter}
            filterBy={setFilter}
            filters={FILTER_VALUES}
          />
          <button
            onClick={clearCompleted}
            className="text-xs whitespace-nowrap text-gray-500"
          >
            Clear Complete
          </button>
        </FilterContent>
      </div>
    </div>
  )
}

export default App
