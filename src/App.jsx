import { motion } from 'framer-motion'

import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'
import { TodoProvider } from './context/todoContext'

import { useSavedTodos } from './hooks/useSavedTodos'

function App() {
  const { todos: initialTodos } = useSavedTodos()

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />
      <TodoProvider initialTodos={initialTodos}>
        <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
          <TodoInput />
          <TodoList />

          <FilterContent />
        </motion.div>
      </TodoProvider>
    </section>
  )
}

export default App
