import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { todoState } from '../store/todos'

import { getTodos } from '../services/todos'

export const useInitialTodos = () => {
  const setTodos = useSetRecoilState(todoState)

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos)
    })
  }, [])
}
