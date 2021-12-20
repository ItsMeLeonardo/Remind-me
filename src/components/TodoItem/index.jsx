import { useState } from 'react'

export default function TodoItem({ todo, completed = false } = {}) {
  const [isCompleted, setIsCompleted] = useState(completed)

  const handleCompleted = () => {
    setIsCompleted(!isCompleted)
  }

  return (
    <div className="todo-item">
      <input type="checkbox" checked={isCompleted} onChange={handleCompleted} />
      <p>{todo}</p>
    </div>
  )
}
