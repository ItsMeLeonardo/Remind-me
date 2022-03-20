import { atom, selector } from 'recoil'

export const FILTER_VALUES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const todoState = atom({
  key: 'todoState',
  default: [],
})

export const filterTodoState = atom({
  key: 'filterTodoState',
  default: FILTER_VALUES.ALL,
})

export const todosToShow = selector({
  key: 'todosToShow',
  get: ({ get }) => {
    const filter = get(filterTodoState)
    const todos = get(todoState)

    switch (filter) {
      case FILTER_VALUES.ACTIVE:
        return todos.filter((todo) => !todo.completed)

      case FILTER_VALUES.COMPLETED:
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  },
})

export const itemsLeftState = selector({
  key: 'itemsLeftState',
  get: ({ get }) => {
    const todos = get(todoState)
    return todos.filter((todo) => !todo.completed).length
  },
})
