import React from 'react'

function TodoFilters({ filterActive, filterBy, filters }) {
  const filterTodo = (event) => {
    const input = event.target.closest('input')
    const filter = input.value
    filterBy(filter)
  }

  const mdClasses = 'md:relative md:inset-0 md:justify-center md:gap-8'

  return (
    <div
      className={`absolute w-full -bottom-16 bg-zinc-800 px-2 py-4 rounded-md flex justify-evenly ${mdClasses}`}
    >
      {Object.values(filters).map((filter, index) => (
        <input
          onClick={filterTodo}
          key={`${filter}-${index}`}
          type="button"
          value={filter}
          disabled={filterActive === filter}
          className="font-bold text-white capitalize cursor-pointer hover:text-zinc-700 transition disabled:text-gray-500"
        />
      ))}
    </div>
  )
}

export default React.memo(TodoFilters, (prevProps, nextProps) => {
  return prevProps.filterActive === nextProps.filterActive
})
