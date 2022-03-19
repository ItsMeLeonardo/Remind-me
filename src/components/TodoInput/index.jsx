import shallow from 'zustand/shallow'
import { useTodoStore } from '../../store/todoStore'

const selector = (state) => state.addTodo

export default function TodoInput() {
  const addTodo = useTodoStore(selector, shallow)

  const handleSubmit = (event) => {
    event.preventDefault()

    const input = event.target.todo

    const text = input.value.trim()

    if (!text) return (input.value = '')

    addTodo(text)
    input.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4 shadow-2xl">
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="create new todo"
        autoComplete="off"
        className="py-3 px-4 outline-none dark:bg-zinc-800 focus:outline focus:outline-2 focus:outline-indigo-400 rounded-md w-full dark:text-white"
      />
    </form>
  )
}
