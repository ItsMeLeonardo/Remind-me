import { useTodoStore } from '../../store/todoStore'
export default function ClearCompleted() {
  const clearCompleted = useTodoStore((state) => state.clearCompleted)

  return (
    <button
      onClick={clearCompleted}
      className="text-xs whitespace-nowrap text-gray-500 transition hover:underline hover:decoration-indigo-500"
    >
      Clear Complete
    </button>
  )
}
