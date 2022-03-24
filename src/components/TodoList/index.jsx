import { useAtomValue, useSetAtom } from 'jotai'
import { Reorder, AnimatePresence } from 'framer-motion'

import TodoItem from '@/components/TodoItem'

import { todoFilteredAtom, reorderTodoAtom, todoAtom } from '@/Atoms/todos'

export default function TodoList() {
  const totalTodos = useAtomValue(todoAtom)
  const todos = useAtomValue(todoFilteredAtom)
  const onReorder = useSetAtom(reorderTodoAtom)

  return (
    <div className="flex flex-col w-full bg-white dark:bg-zinc-800 rounded-t-md shadow-neutral-900">
      <Reorder.Group axis="y" values={totalTodos} onReorder={onReorder}>
        <AnimatePresence>
          {todos.map((item, index) => (
            <Reorder.Item key={item.id} value={item}>
              <TodoItem todo={item} index={index} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  )
}
