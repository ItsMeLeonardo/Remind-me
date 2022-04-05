import { Reorder, AnimatePresence } from 'framer-motion'

import TodoContent from './TodoContent'
import TodoItem from '../TodoItem'

import { useTodos } from '../../hooks/useTodos'
import { useFilter } from '../../hooks/useFilter'

export default function TodoList() {
  const { toggleTodo, deleteTodo, setTodos, todos } = useTodos()
  const { filter, FILTER_VALUES } = useFilter()

  const onReorder = (todos) => {
    if (filter !== FILTER_VALUES.ALL) {
      return
    }
    setTodos(todos)
  }

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  return (
    <TodoContent>
      <Reorder.Group axis="y" values={todos} onReorder={onReorder}>
        <AnimatePresence>
          {todosToShow.map((item, index) => (
            <Reorder.Item key={item.id} value={item}>
              <TodoItem
                todo={item}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                index={index}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </TodoContent>
  )
}
