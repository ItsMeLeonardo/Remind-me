import { useCallback } from 'react'
import { useRecoilState } from 'recoil'

import { FILTER_VALUES, filterTodoState } from '../store/todos'

export const useFilter = () => {
  const [filter, setFilter] = useRecoilState(filterTodoState)

  const filterBy = useCallback((filter) => setFilter(filter), [setFilter])

  return {
    filterBy,
    filter,
    FILTER_VALUES,
  }
}
