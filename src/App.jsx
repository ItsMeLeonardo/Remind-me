import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'

import TodoItem from './components/TodoItem'
import TodoFilters from './components/TodoFilters'
import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'

import { useTodos } from './hooks/useTodos'

const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

function App() {
  const { todos, addTodo, deleteTodo, clearCompleted, toggleTodo, setTodos } = useTodos()

  const [filter, setFilter] = useState(FILTER_VALUES.ALL)

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  const itemLefts = todos.filter((todo) => !todo.completed).length

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />

      <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput addTodo={addTodo} />
        <TodoContent>
          <Reorder.Group axis="y" values={todosToShow} onReorder={setTodos}>
            <AnimatePresence>
              {todosToShow.map((item, index) => (
                <Reorder.Item key={item.id} value={item}>
                  <TodoItem
                    todo={item}
                    completed={item.completed}
                    toggleCompleteTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    index={index}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
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
      </motion.div>
    </section>
  )
}

export default App
