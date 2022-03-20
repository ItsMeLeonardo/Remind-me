import { motion } from 'framer-motion'

import TodoContent from './components/TodoContent'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'

import { useInitialTodos } from './hooks/useInitialTodos'

function App() {
  useInitialTodos()

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />

      <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput />
        <TodoContent />
        <FilterContent />
      </motion.div>
    </section>
  )
}

export default App
