import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import ClearCompleted from './ClearCompleted'
import TodoFilters from './TodoFilters'

import { useTodoStore } from '../../store/todoStore'

const DEFAULT_CLASSES =
  'flex justify-between items-center py-4 bg-white dark:bg-zinc-800 relative rounded-b-md justify-around todoItem z-10'
const MD_CLASSES = 'md:justify-around md:py-0 md:px-8'

export default function FilterContent() {
  const itemLefts = useTodoStore(
    useCallback(
      (state) => state.todos.filter((todo) => todo.completed === false).length,
      [],
    ),
    shallow,
  )

  return (
    <div className={`${DEFAULT_CLASSES} ${MD_CLASSES}`}>
      <p className="text-xs whitespace-nowrap text-gray-500">{itemLefts} items left</p>
      <TodoFilters />
      <ClearCompleted />
    </div>
  )
}
