import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { todoActions } from '../store'
import { getTodos } from '../services/todos'

/**
 * @description this hook initializes the `todoState` from the store with the todos from the service
 * @returns { Object: Boolean } return the loading status
 */
export const useSavedTodos = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    getTodos()
      .then((todos) => {
        dispatch(todoActions.initialTodo(todos))
        setIsLoading(true)
      })
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading }
}
