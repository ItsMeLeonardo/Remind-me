export default function TodoInput({ addTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.todo

    const text = input.value.trim()

    if (text.length === 0) {
      input.value = ''
      return
    }

    const todo = {
      id: Date.now(),
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
        className="py-3 px-4 outline-none dark:bg-zinc-800 rounded-md w-full dark:text-white"
      />
    </form>
  )
}
