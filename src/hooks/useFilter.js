import { useCallback, useContext } from 'react'

import { TodoContext } from '../context/todoContext'

export const useFilter = () => {
  const { filter, setFilter, FILTER_VALUES } = useContext(TodoContext)

  const filterByActive = useCallback(() => {
    setFilter(FILTER_VALUES.ACTIVE)
  }, [])

  const filterByCompleted = useCallback(() => {
    setFilter(FILTER_VALUES.COMPLETED)
  }, [])

  const resetFilter = useCallback(() => {
    setFilter(FILTER_VALUES.ALL)
  }, [])

  return {
    filter,
    filterByActive,
    filterByCompleted,
    resetFilter,
    FILTER_VALUES,
  }
}
