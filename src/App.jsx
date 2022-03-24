import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { motion } from 'framer-motion'

import TodoFilters from './components/TodoFilters'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import FilterContent from './components/FilterContent'
import Header from './components/Header'

import { getTodos } from '@/services/todos'
import {
  todoAtom,
  filterAtom,
  itemsLeftAtom,
  FILTER_VALUES,
  clearCompleteAtom,
} from '@/Atoms/todos'

function App() {
  const [, setInitialTodos] = useAtom(todoAtom)
  const [, clearCompleted] = useAtom(clearCompleteAtom)
  const [filter, setFilter] = useAtom(filterAtom)
  const [itemsLeft] = useAtom(itemsLeftAtom)

  useEffect(() => {
    getTodos().then(setInitialTodos)
  }, [])
  return (
    <section className="flex flex-col justify-center items-center h-full">
      <Header />
      <motion.div className="w-11/12 flex flex-col relative md:w-9/12 lg:w-6/12">
        <TodoInput />
        <TodoList />

        <FilterContent>
          <p className="text-xs whitespace-nowrap text-gray-500">
            {itemsLeft} items left
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
