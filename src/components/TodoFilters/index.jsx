import React from 'react'

import TextFilterBtn from './TextFilterBtn'

import { useFilter } from '../../hooks/useFilter'

function TodoFilters() {
  const { filter, filterByActive, filterByCompleted, resetFilter, FILTER_VALUES } =
    useFilter()

  const mdClasses = 'md:relative md:inset-0 md:justify-center md:gap-8'

  return (
    <div
      className={`absolute w-full -bottom-16 dark:bg-zinc-800 px-2 py-4 rounded-md flex justify-evenly ${mdClasses}`}
    >
      <TextFilterBtn
        label={FILTER_VALUES.ALL}
        isActive={FILTER_VALUES.ALL === filter}
        onClick={resetFilter}
      />
      <TextFilterBtn
        label={FILTER_VALUES.ACTIVE}
        isActive={FILTER_VALUES.ACTIVE === filter}
        onClick={filterByActive}
      />
      <TextFilterBtn
        label={FILTER_VALUES.COMPLETED}
        isActive={FILTER_VALUES.COMPLETED === filter}
        onClick={filterByCompleted}
      />
    </div>
  )
}

export default React.memo(TodoFilters, (prevProps, nextProps) => {
  return prevProps.filterActive === nextProps.filterActive
})
