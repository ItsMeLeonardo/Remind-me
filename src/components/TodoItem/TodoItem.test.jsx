import { describe, expect, vi } from 'vitest'

import { render, fireEvent, prettyDOM } from '../../test/testUtils'

import TodoItem from '.'

const todo = {
  text: 'test',
  id: 'test',
  completed: true,
}

const mockHandlerToggle = vi.fn()

const mockHandlerDelete = vi.fn()

let component

beforeEach(() => {
  component = render(
    <TodoItem
      todo={todo}
      deleteTodo={mockHandlerDelete}
      toggleCompleteTodo={mockHandlerToggle}
    />,
  )
})

describe('<TodoItem />', () => {
  test('Should render the same info from Todo prop', () => {
    component.getByText(todo.text)
  })

  test('should call toggle function', () => {
    const labelInput = component.getByText(todo.text)
    fireEvent.click(labelInput)
    expect(mockHandlerToggle).toHaveBeenCalledOnce()
  })

  test('should call delete function', () => {
    const button = component.getByLabelText('delete')
    fireEvent.click(button)
    expect(mockHandlerDelete).toHaveBeenCalledOnce()
  })

  const checkboxStyles = {
    default: 'border-2 border-gray-500',
    checked: 'checked:from-indigo-500 checked:to-purple-500 checked:border-none',
  }

  test('should show correct checkbox status when is completed', () => {
    const todoIncomplete = {
      text: 'test',
      id: 'test',
      completed: true,
    }
    const todoComponent = render(<TodoItem todo={todoIncomplete} />)

    const checkbox = todoComponent.container.querySelector('input[type="checkbox"]')
    expect(checkbox.checked).toBe(true)
  })
})
