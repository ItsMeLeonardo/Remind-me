import { AnimatePresence, Reorder } from 'framer-motion'

import TodoContent from './TodoContent'
import TodoItem from '../TodoItem'

import { useTodoStore } from '../../store/todoStore'
import { useFilter, FILTER_VALUES } from '../../store/filterState'

const selector = (state) => ({
  todos: state.todos,
  reorderTodo: state.reorderTodo,
  deleteTodo: state.deleteTodo,
  toggleTodo: state.toggleTodo,
})

export default function TodoList() {
  const { todos, reorderTodo, deleteTodo, toggleTodo } = useTodoStore(selector)

  const filter = useFilter((state) => state.filter)

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  return (
    <TodoContent>
      <Reorder.Group axis="y" values={todosToShow} onReorder={reorderTodo}>
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
