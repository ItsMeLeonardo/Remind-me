import { useTodos } from '../../hooks/useTodos'

export default function TodoInput() {
  const { addTodo } = useTodos()

  const handleSubmit = (event) => {
    event.preventDefault()

    const input = event.target.todo

    const text = input.value.trim()

    if (!text) return (input.value = '')

    const todo = {
      id: globalThis.crypto.randomUUID(),
      text,
      completed: false,
    }

    addTodo({ todo })
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
