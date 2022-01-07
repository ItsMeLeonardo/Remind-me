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
  return await db.getAll(STORE_NAME)
}

/**
 *
 * @param {Object} todo the todo to add to the store
 * @returns {Promise<number|string|Date|ArrayBufferView|ArrayBuffer|IDBValidKey[]>}
 */
export const saveTodos = async ({ todo }) => {
  const db = await dbPromise
  return await db.put(STORE_NAME, todo, todo.id)
}

export const toggleTodo = async ({ todo }) => {
  const db = await dbPromise
  await db.put(STORE_NAME, todo, todo.id)
}

/**
 *
 * @param {String} id the id of the todo to delete
 * @returns {Promise<void>}
 */
export const deleteTodo = async ({ id }) => {
  const db = await dbPromise
  await db.delete(STORE_NAME, id)
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
