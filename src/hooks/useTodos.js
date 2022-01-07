import { useCallback, useState } from 'react'

const data = [
  {
    id: 1,
    text: 'Learn React',
    completed: false,
  },
  {
    id: 2,
    text: 'Learn Redux',
    completed: false,
  },
  {
    id: 3,
    text: 'Learn React Router',
    completed: false,
  },
]

export function useTodos() {
  const [todos, setTodos] = useState(data)

  const toggleTodo = useCallback(({ id }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      }),
    )
  }, [])

  const deleteTodo = useCallback(({ id }) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const addTodo = useCallback(({ todo }) => {
    setTodos((prevTodos) => [...prevTodos, todo])
  }, [])

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    if (newTodos.length !== todos.length) {
      setTodos(newTodos)
    }
  }

  return {
    todos,
    toggleTodo,
    deleteTodo,
    addTodo,
    clearCompleted,
  }
}
