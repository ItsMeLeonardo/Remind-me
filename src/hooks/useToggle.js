import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue)

  const toggle = useCallback(() => setState((prevState) => !prevState), [])

  return [state, toggle]
}
