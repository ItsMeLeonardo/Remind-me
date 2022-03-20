import React from 'react'
import { useFilter } from '../../hooks/useFilter'

const mdClasses = 'md:relative md:inset-0 md:justify-center md:gap-8'

function TodoFilters() {
  const { FILTER_VALUES, filter, filterBy } = useFilter()

  const filterTodo = (event) => {
    const button = event.target.closest('button')

    const filter = button.textContent
    filterBy(filter)
  }

  return (
    <div
      className={`absolute w-full -bottom-16 dark:bg-zinc-800 px-2 py-4 rounded-md flex justify-evenly ${mdClasses}`}
    >
      {Object.values(FILTER_VALUES).map((filterValue, index) => (
        <button
          onClick={filterTodo}
          key={`${filterValue}-${index}`}
          disabled={filter === filterValue}
          className="font-bold capitalize cursor-pointer hover:text-gray-500 dark:text-white transition disabled:text-indigo-400 dark:disabled:text-indigo-700"
        >
          {filterValue}
        </button>
      ))}
    </div>
  )
}

export default React.memo(TodoFilters, (prevProps, nextProps) => {
  return prevProps.filterActive === nextProps.filterActive
})
