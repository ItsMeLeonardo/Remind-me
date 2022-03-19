import { useEffect } from 'react'
import { motion } from 'framer-motion'

import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'

import { useTodoStore } from './store/todoStore'

const selector = (state) => state.setInitialTodos

function App() {
  const setInitialTodos = useTodoStore(selector)

  useEffect(() => {
    setInitialTodos()
  }, [])

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />

      <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput />
        <TodoList />
        <FilterContent />
      </motion.div>
    </section>
  )
}

export default App
