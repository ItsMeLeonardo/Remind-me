import React, { useState } from 'react'

function TodoItem({ todo, toggleCompleteTodo } = {}) {
  const [isCompleted, setIsCompleted] = useState(!!todo.completed)

  const handleCompleted = () => {
    const newState = !isCompleted
    setIsCompleted(newState)
    toggleCompleteTodo((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...t, completed: newState } : t)),
    )
  }

  return (
    <div className="todo-item">
      <input type="checkbox" checked={isCompleted} onChange={handleCompleted} />
      <p>{todo.text}</p>
    </div>
  )
}

export default React.memo(TodoItem)
