import { atom } from 'jotai'

import { deleteCompleted, toggleTodo, saveTodos, deleteTodo } from '@/services/todos'

import { groupBy } from '@/utils/groupBy'

export const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const todoAtom = atom([])

export const addTodoAtom = atom(null, async (get, set, text) => {
  const todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  }
  await saveTodos({ todo })
  set(todoAtom, (prev) => [todo, ...prev])
})

export const toggleTodoAtom = atom(null, async (get, set, id) => {
  const todo = get(todoAtom).find((todo) => todo.id === id)
  await toggleTodo({ todo })
  set(todoAtom, (prev) =>
    prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
  )
})

export const deleteTodoAtom = atom(null, async (get, set, id) => {
  await deleteTodo({ id })
  set(todoAtom, (prev) => prev.filter((todo) => todo.id !== id))
})

export const clearCompleteAtom = atom(null, async (get, set) => {
  const { false: incomplete, true: completed } = groupBy(get(todoAtom), 'completed')
  console.log({ incomplete, completed })
  if (!completed) return
  await deleteCompleted(completed)
  set(todoAtom, incomplete || [])
})

export const reorderTodoAtom = atom(null, (get, set, todos) => {
  if (!todos) return
  const globalTodos = get(todoAtom)

  if (globalTodos.length !== todos.length) return

  set(todoAtom, todos)
})

export const filterAtom = atom('all', (get, set, filter) => {
  if (filter === get(filterAtom)) return
  set(filterAtom, filter)
})

export const todoFilteredAtom = atom((get, set) => {
  const todos = get(todoAtom)
  const filter = get(filterAtom)

  if (!filter) return todos

  switch (filter) {
    case FILTER_VALUES.ACTIVE:
      return todos.filter((todo) => !todo.completed)
    case FILTER_VALUES.COMPLETED:
      return todos.filter((todo) => todo.completed)
    default:
      return todos
  }
})

export const itemsLeftAtom = atom((get, set) => {
  const todos = get(todoAtom)
  const itemsLeft = todos.filter((todo) => !todo.completed).length
  return itemsLeft
})
