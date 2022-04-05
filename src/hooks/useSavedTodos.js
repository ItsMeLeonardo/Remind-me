import { useEffect, useState } from 'react'
import { getTodos } from '../services/todos'

/**
 *
 * @returns {Array} with the todos saved in service
 */
export const useSavedTodos = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos().then(setTodos).catch(console.log)
  }, [])

  return { todos }
}
