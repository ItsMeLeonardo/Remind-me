import { useCallback, useContext } from 'react'
import {
  deleteCompleted,
  deleteTodo as deleteTodoFromService,
  saveTodos,
  toggleTodo as toggleTodoFromService,
} from '../services/todos'
import { groupBy } from '../utils/groupBy'

import { TodoContext } from '../context/todoContext'

export function useTodos() {
  const { todos, setTodos } = useContext(TodoContext)

  /**
   * @param {Number} id - Todo id
   */
  const toggleTodo = useCallback(({ id }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const todoUpdated = {
            ...todo,
            completed: !todo.completed,
          }
          toggleTodoFromService({ todo: todoUpdated }).catch(console.log)
          return todoUpdated
        }
        return todo
      }),
    )
  }, [])

  /**
   * @param {Number} id - Todo id
   */
  const deleteTodo = useCallback(({ id }) => {
    deleteTodoFromService({ id }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    })
  }, [])

  /**
   * @param {Object} Todo - the todo to added
   */
  const addTodo = useCallback(({ todo }) => {
    saveTodos({ todo }).then(() => {
      setTodos((prevTodos) => [todo, ...prevTodos])
    })
  }, [])

  /**
   * @description Delete all completed todos
   */
  const clearCompleted = () => {
    const { false: incomplete, true: completed } = groupBy(todos, 'completed')
    if (completed) {
      setTodos(incomplete || [])
      deleteCompleted(completed).then()
    }
  }

  return {
    todos,
    toggleTodo,
    deleteTodo,
    addTodo,
    clearCompleted,
    setTodos,
  }
}
