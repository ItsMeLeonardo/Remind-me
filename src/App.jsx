import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import { useEffect, useState } from 'react'
import FilterContent from './components/FilterContent'
import { SunIcon, MoonIcon } from './Icons/ThemeIcons'
import { useTodos } from './hooks/useTodos'
import { useToggle } from './hooks/useToggle'

const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

function App() {
  const [isDarkMode, setDarkMode] = useToggle()
  const { todos, addTodo, deleteTodo, clearCompleted, toggleTodo } = useTodos()

  const [filter, setFilter] = useState(FILTER_VALUES.ALL)

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  useEffect(() => {
    const htmlRoot = document.querySelector('html')
    if (isDarkMode) {
      htmlRoot.classList.add('dark')
    } else {
      htmlRoot.classList.remove('dark')
    }
  }, [isDarkMode])

  const itemLefts = todos.filter((todo) => !todo.completed).length

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <header className="w-11/12 flex mb-6 justify-between md:w-9/12 lg:w-6/12 py-4">
        <h1 className="dark:text-white text-2xl tracking-wide font-bold">Remind Me</h1>
        <button
          onClick={setDarkMode}
          className="group p-2 transition duration-500 rounded-full hover:shadow-lg  hover:shadow-gray-100 hover:bg-white"
        >
          {isDarkMode ? (
            <SunIcon className="text-white transition duration-500 group-hover:text-zinc-800" />
          ) : (
            <MoonIcon className="" />
          )}
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
