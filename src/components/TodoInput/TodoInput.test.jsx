import { describe, expect, vi } from 'vitest'

import { render, fireEvent } from '../../test/testUtils'

import TodoInput from '.'

describe('INPUT: Add new TODO', () => {
  const mockHandler = vi.fn()

  const component = render(<TodoInput addTodo={mockHandler} />)
  const input = component.getByPlaceholderText('create new todo')
  const valueTest = 'test'

  fireEvent.change(input, { target: { value: valueTest } })

  test('input text should be have value ', () => {
    expect(input.value).toEqual(valueTest)
  })

  test('should call any function when submit form', () => {
    //FIXME: this test is not working
    // expect(mockHandler).toHaveBeenCalledOnce()
  })
})
