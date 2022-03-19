import React from 'react'
import shallow from 'zustand/shallow'

import { useFilter, FILTER_VALUES } from '../../store/filterState'

function BtnFilterText({ onClick, isActive, label }) {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className="font-bold capitalize cursor-pointer hover:text-gray-500 dark:text-white transition disabled:text-indigo-400 dark:disabled:text-indigo-700"
    >
      {label}
    </button>
  )
}

const selector = (state) => ({
  filterByActive: state.filterByActive,
  filterByCompleted: state.filterByCompleted,
  filterByAll: state.filterByAll,
  filter: state.filter,
})

function TodoFilters() {
  const { filterByActive, filterByCompleted, filterByAll, filter } = useFilter(
    selector,
    shallow,
  )

  const mdClasses = 'md:relative md:inset-0 md:justify-center md:gap-8'

  return (
    <div
      className={`absolute w-full -bottom-16 dark:bg-zinc-800 px-2 py-4 rounded-md flex justify-evenly ${mdClasses}`}
    >
      <BtnFilterText
        isActive={filter === FILTER_VALUES.ALL}
        onClick={filterByAll}
        label={FILTER_VALUES.ALL}
      />
      <BtnFilterText
        isActive={filter === FILTER_VALUES.ACTIVE}
        onClick={filterByActive}
        label={FILTER_VALUES.ACTIVE}
      />
      <BtnFilterText
        isActive={filter === FILTER_VALUES.COMPLETED}
        onClick={filterByCompleted}
        label={FILTER_VALUES.COMPLETED}
      />
    </div>
  )
}

export default React.memo(TodoFilters, (prevProps, nextProps) => {
  return prevProps.filterActive === nextProps.filterActive
})
