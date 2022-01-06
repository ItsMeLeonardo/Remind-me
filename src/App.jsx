import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import { useCallback, useState } from 'react'
import FilterContent from './components/FilterContent'
import { SunIcon } from './Icons/ThemeIcons'

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

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  const toggleTodo = useCallback(({ id }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      }),
    )
  }, [])

  const deleteTodo = useCallback(({ id }) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const addTodo = useCallback(({ todo }) => {
    setTodos((prevTodos) => [...prevTodos, todo])
  }, [])

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    if (newTodos.length !== todos.length) {
      setTodos(newTodos)
    }
  }
  const itemLefts = todos.filter((todo) => !todo.completed).length

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <header className="w-11/12 flex mb-6 justify-between md:w-9/12 lg:w-6/12 py-4">
        <h1 className="text-white text-2xl tracking-wide font-bold">Remind Me</h1>
        <button>
          <SunIcon className="text-white" />
        </button>
      </header>

      <div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput addTodo={addTodo} />
        <TodoContent>
          {todosToShow.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              completed={item.completed}
              toggleCompleteTodo={toggleTodo}
              deleteTodo={deleteTodo}
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
            className="text-xs whitespace-nowrap text-gray-500 transition hover:underline hover:decoration-indigo-500"
          >
            Clear Complete
          </button>
        </FilterContent>
      </div>
    </section>
  )
}

export default App
