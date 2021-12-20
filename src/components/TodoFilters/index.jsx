export default function TodoFilters({
  filterActive,
  filterBy,
  filters,
  optionLeft,
  optionRight,
}) {
  const filterTodo = (event) => {
    const input = event.target.closest('input')
    const filter = input.value
    filterBy(filter)
  }

  return (
    <div className="todo-filters">
      {optionLeft}
      {Object.values(filters).map((filter, index) => (
        <input
          onClick={filterTodo}
          key={`${filter}-${index}`}
          type="button"
          value={filter}
          disabled={filterActive === filter}
        />
      ))}
      {optionRight}
    </div>
  )
}
