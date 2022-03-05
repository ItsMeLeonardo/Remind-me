import { describe, expect, vi, beforeEach } from 'vitest'

import { render, userEvent, screen, fireEvent, prettyDOM } from '../../test/testUtils'

import TodoInput from '.'

describe('INPUT: Add new TODO', () => {
  const mockHandler = vi.fn()
  mockHandler({})
  const component = render(<TodoInput addTodo={mockHandler} />)
  const input = component.getByPlaceholderText('create new todo')
  const valueTest = 'test'

  // simulate text input and submit
  const form = input.parentElement
  fireEvent.change(input, { target: { value: valueTest } })
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

  test('input text should be have value ', () => {
    expect(input.value).toEqual(valueTest)
  })

  test('should call any function when submit form', () => {
    fireEvent.submit(form)
    expect(mockHandler).toHaveBeenCalledOnce()
  })
})
