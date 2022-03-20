import { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { todoState, todosToShow, itemsLeftState } from '../store/todos'

import {
  deleteCompleted,
  deleteTodo as deleteTodoFromService,
  saveTodos,
  toggleTodo as toggleTodoFromService,
} from '../services/todos'
import { groupBy } from '../utils/groupBy'

export function useTodos() {
  const setTodos = useSetRecoilState(todoState)

  const allStateTodos = useRecoilValue(todoState)
  const todos = useRecoilValue(todosToShow)
  const itemsLeft = useRecoilValue(itemsLeftState)

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

  const addTodo = useCallback(({ text }) => {
    const todo = {
      id: globalThis.crypto.randomUUID(),
      text,
      completed: false,
    }
    saveTodos({ todo }).then(() => {
      setTodos((prevTodos) => [todo, ...prevTodos])
    })
  }, [])

  const clearCompleted = () => {
    const { false: incomplete, true: completed } = groupBy(allStateTodos, 'completed')
    if (completed) {
      setTodos(incomplete || [])
      deleteCompleted(completed).then()
    }
  }

  const reorderTodos = useCallback(
    (newOrder) => {
      if (newOrder.length !== allStateTodos.length) return
      setTodos(newOrder)
    },
    [allStateTodos],
  )

  return {
    todos,
    toggleTodo,
    deleteTodo,
    addTodo,
    clearCompleted,
    reorderTodos,
    itemsLeft,
  }
}
