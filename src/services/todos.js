import { openDB } from 'idb'

const STORE_NAME = 'todos'

const dbPromise = openDB('todos', 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME)
  },
})

/**
 * Get all todos from the database
 * @returns {Promise}
 */
export const getTodos = async () => {
  const db = await dbPromise
  const response = await db.getAll(STORE_NAME)
  console.log({ response })
  return response
}

/**
 *
 * @param {Object} todo the todo to add to the store
 * @returns {Promise<number|string|Date|ArrayBufferView|ArrayBuffer|IDBValidKey[]>}
 */
export const saveTodos = async ({ todo }) => {
  const db = await dbPromise
  const response = await db.put(STORE_NAME, todo, todo.id)

  console.log({ response })
  return response
}

export const toggleTodo = async ({ todo }) => {
  const db = await dbPromise
  const updated = await db.put(STORE_NAME, todo, todo.id)
  console.log({ updated })
}

/**
 *
 * @param {String} id the id of the todo to delete
 * @returns {Promise<void>}
 */
export const deleteTodo = async ({ id }) => {
  const db = await dbPromise
  const response = await db.delete(STORE_NAME, id)
  console.log({ response })
}

/**
 *
 * @param {Array} todosCompleted an array of todos that are completed
 * @returns {Promise<void>}
 */
export const deleteCompleted = async (todosCompleted) => {
  const db = await dbPromise
  const promises = todosCompleted.map((todo) => db.delete(STORE_NAME, todo.id))
  await Promise.all(promises)
}
