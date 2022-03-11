import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterActions, FILTER_VALUES } from '../../store'

function TodoFilters() {
  const filterActive = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    const button = event.target.closest('button')

    const filter = button.textContent
    dispatch(filterActions.setFilter(filter))
  }

  const mdClasses = 'md:relative md:inset-0 md:justify-center md:gap-8'

  return (
    <div
      className={`absolute w-full -bottom-16 dark:bg-zinc-800 px-2 py-4 rounded-md flex justify-evenly ${mdClasses}`}
    >
      {Object.values(FILTER_VALUES).map((filter, index) => (
        <button
          onClick={changeFilter}
          key={`${filter}-${index}`}
          disabled={filterActive === filter}
          className="font-bold capitalize cursor-pointer hover:text-gray-500 dark:text-white transition disabled:text-indigo-400 dark:disabled:text-indigo-700"
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default React.memo(TodoFilters)
