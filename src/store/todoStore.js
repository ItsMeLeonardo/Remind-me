import create from 'zustand'

import { groupBy } from '../utils/groupBy'

import {
  deleteCompleted,
  deleteTodo as deleteTodoFromService,
  getTodos,
  saveTodos,
  toggleTodo as toggleTodoFromService,
} from '../services/todos'

export const useTodoStore = create((set, get) => ({
  //state
  todos: [],
  //actions
  setInitialTodos: async () => {
    const todos = await getTodos()
    set({ todos })
  },
  addTodo: async (text) => {
    const todo = {
      text,
      id: crypto.randomUUID(),
      completed: false,
    }
    const todos = [todo, ...get().todos]
    await saveTodos({ todo })
    set({ todos })
  },
  toggleTodo: async (id) => {
    let todoUpdate = null
    const todos = get().todos.map((todo) => {
      if (todo.id !== id) return todo
      todoUpdate = { ...todo, completed: !todo.completed }
      return todoUpdate
    })
    await toggleTodoFromService({ todo: todoUpdate })
    set({ todos })
  },
  deleteTodo: async (id) => {
    await deleteTodoFromService({ id })
    const todos = get().todos.filter((todo) => todo.id !== id)
    set({ todos })
  },
  clearCompleted: async () => {
    const { false: incomplete, true: completed } = groupBy(get().todos, 'completed')
    if (!completed) return
    await deleteCompleted(completed)
    set({ todos: incomplete || [] })
  },
  reorderTodo: (todos) => {
    if (todos.length !== get().todos.length) return
    set({ todos })
  },
}))
