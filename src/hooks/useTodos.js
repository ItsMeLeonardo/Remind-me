import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { todoState } from '../store/todos'

import {
  deleteCompleted,
  deleteTodo as deleteTodoFromService,
  getTodos,
  saveTodos,
  toggleTodo as toggleTodoFromService,
} from '../services/todos'
import { groupBy } from '../utils/groupBy'

export function useTodos() {
  const [todos, setTodos] = useRecoilState(todoState)

  useEffect(() => {
    if (todos.length !== 0) return
    getTodos().then(setTodos).catch(console.log)
  }, [])

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

  const deleteTodo = useCallback(({ id }) => {
    deleteTodoFromService({ id }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    })
  }, [])

  const addTodo = useCallback(({ todo }) => {
    saveTodos({ todo }).then(() => {
      setTodos((prevTodos) => [todo, ...prevTodos])
    })
  }, [])

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
