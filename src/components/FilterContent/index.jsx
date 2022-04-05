import TodoFilters from '../TodoFilters'

import { useTodos } from '../../hooks/useTodos'

const DEFAULT_CLASSES =
  'flex justify-between items-center py-4 bg-white dark:bg-zinc-800 relative rounded-b-md justify-around todoItem z-10'
const MD_CLASSES = 'md:justify-around md:py-0 md:px-8'

export default function FilterContent() {
  const { todos, clearCompleted } = useTodos()

  const itemLefts = todos.filter((todo) => !todo.completed).length

  return (
    <div className={`${DEFAULT_CLASSES} ${MD_CLASSES}`}>
      <p className="text-xs whitespace-nowrap text-gray-500">{itemLefts} items left</p>
      <TodoFilters />
      <button
        onClick={clearCompleted}
        className="text-xs whitespace-nowrap text-gray-500 transition hover:underline hover:decoration-indigo-500"
      >
        Clear Complete
      </button>
    </div>
  )
}
