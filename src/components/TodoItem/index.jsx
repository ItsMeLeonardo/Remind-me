import React from 'react'
import CheckIcon from '../../Icons/CheckIcon'
import CloseIcon from '../../Icons/CloseIcon'

const checkboxStyles = {
  default: 'border-2 border-gray-500',
  checked: 'checked:from-indigo-500 checked:to-purple-500 checked:border-none',
}

function TodoItem({ todo, toggleCompleteTodo, deleteTodo } = {}) {
  const isCompleted = todo.completed

  const handleCompleted = () => {
    console.log('complet')
    toggleCompleteTodo({ id: todo.id })
  }

  return (
    <li className="flex items-center justify-between gap-4 p-4 text-white todoItem">
      <div className="w-6 h-6 flex relative justify-center items-center cursor-pointer">
        {isCompleted && <CheckIcon className="absolute" />}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompleted}
          id={todo.id}
          className={`bg-gradient-to-r ${checkboxStyles.checked} ${checkboxStyles.default} appearance-none w-6 h-6 rounded-full cursor-pointer`}
        />
      </div>
      <label htmlFor={todo.id} className="cursor-pointer text-sm w-full cursor-pointer ">
        {todo.text}
      </label>
      <button
        onClick={() => deleteTodo({ id: todo.id })}
        className="rounded-full p-2 flex justify-center items-center transform transition duration-500 hover:bg-pink-500 shadow-lg hover:shadow-pink-500/50 active:scale-90"
      >
        <CloseIcon />
      </button>
    </li>
  )
}

export default React.memo(TodoItem)
