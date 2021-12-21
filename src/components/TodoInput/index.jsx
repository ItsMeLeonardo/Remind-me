export default function TodoInput({ addTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.todo
    const todo = {
      id: Date.now(),
      text: input.value,
      completed: false,
    }

    addTodo((todos) => [...todos, todo])

    input.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4 shadow-2xl">
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="create new todo"
        className="py-3 px-4 outline-none bg-zinc-800 rounded-md w-full text-white"
      />
    </form>
  )
}
