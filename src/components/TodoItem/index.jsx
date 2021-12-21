import React, { useState } from 'react'
import CheckIcon from '../../Icons/CheckIcon'

function TodoItem({ todo, toggleCompleteTodo } = {}) {
  const [isCompleted, setIsCompleted] = useState(!!todo.completed)

  const handleCompleted = () => {
    const newState = !isCompleted
    setIsCompleted(newState)
    toggleCompleteTodo((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, completed: newState } : t)),
    )
  }

  const checkboxStyles = {
    default: 'border-2 border-gray-500',
    checked: 'checked:from-indigo-500 checked:to-purple-500 checked:border-none',
  }

  return (
    <li
      onClick={handleCompleted}
      className="cursor-pointer flex items-center gap-4 px-2 py-4 text-white todoItem"
    >
      <div className="w-6 h-6 flex relative justify-center items-center cursor-pointer">
        {isCompleted && <CheckIcon className="absolute" />}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompleted}
          id={todo.id}
          className={`bg-gradient-to-r ${checkboxStyles.checked} ${checkboxStyles.default} appearance-none w-6 h-6 rounded-full`}
        />
      </div>
      <label htmlFor={todo.id} className="cursor-pointer text-sm">
        {todo.text}
      </label>
    </li>
  )
}

export default React.memo(TodoItem)
