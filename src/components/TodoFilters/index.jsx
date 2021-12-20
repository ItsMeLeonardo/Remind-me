import React from 'react'

function TodoFilters({ filterActive, filterBy, filters }) {
  const filterTodo = (event) => {
    const input = event.target.closest('input')
    const filter = input.value
    filterBy(filter)
  }

  return (
    <div className="todo-filters">
      {Object.values(filters).map((filter, index) => (
        <input
          onClick={filterTodo}
          key={`${filter}-${index}`}
          type="button"
          value={filter}
          disabled={filterActive === filter}
        />
      ))}
    </div>
  )
}

export default React.memo(TodoFilters, (prevProps, nextProps) => {
  return prevProps.filterActive === nextProps.filterActive
})
