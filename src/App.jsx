import { motion } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'
import { todoActions } from './store'

import { deleteCompleted } from './services/todos'

import TodoFilters from './components/TodoFilters'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'

import { useSavedTodos } from './hooks/useSavedTodos'

function App() {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  const { isLoading } = useSavedTodos()

  const onClearCompleted = () => {
    //TODO: add modal to confirm this action
    deleteCompleted(todos.filter((todo) => todo.completed))
    dispatch(todoActions.clearCompleted())
  }

  const numberTaskToBeDone = todos.filter((todo) => !todo.completed).length

  if (isLoading) {
    //TODO: create loading component
    return (
      <div className="animate-pulse flex justify-center items-center h-screen">
        <span>Wait please 🥺</span>
      </div>
    )
  }

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />

      <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput />
        <TodoList />

        <FilterContent>
          <p className="text-xs whitespace-nowrap text-gray-500">
            {numberTaskToBeDone} items left
          </p>
          <TodoFilters />
          <button
            onClick={onClearCompleted}
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
