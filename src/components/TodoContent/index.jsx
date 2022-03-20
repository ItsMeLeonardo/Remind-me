import { AnimatePresence, Reorder } from 'framer-motion'

import TodoItem from '../TodoItem'

import { useTodos } from '../../hooks/useTodos'

export default function TodoContent() {
  const { todos, deleteTodo, toggleTodo, reorderTodos } = useTodos()

  return (
    <div className="flex flex-col w-full bg-white dark:bg-zinc-800 rounded-t-md shadow-neutral-900">
      <Reorder.Group axis="y" values={todos} onReorder={reorderTodos}>
        <AnimatePresence>
          {todos.map((item, index) => (
            <Reorder.Item key={item.id} value={item}>
              <TodoItem
                todo={item}
                completed={item.completed}
                toggleCompleteTodo={toggleTodo}
                deleteTodo={deleteTodo}
                index={index}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}
