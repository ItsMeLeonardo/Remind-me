export default function TodoInput({ addTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.todo
    console.log({ input })
    const todo = {
      id: Date.now(),
      text: input.value,
      completed: false,
    }

    addTodo((todos) => [...todos, todo])

    input.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="todo" id="todo" placeholder="create new todo" />
      <button>Add a new todo</button>
    </form>
  )
}
