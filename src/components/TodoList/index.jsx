import { motion, AnimatePresence, Reorder } from 'framer-motion'

import { useDispatch, useSelector } from 'react-redux'
import { todoActions, FILTER_VALUES } from '../../store'

import TodoContent from './TodoContent'
import TodoItem from '../TodoItem'

export default function TodoList() {
  const todos = useSelector((state) => state.todos)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  let todosToShow = todos
  if (filter === FILTER_VALUES.ACTIVE) {
    todosToShow = todos.filter((todo) => !todo.completed)
  }
  if (filter === FILTER_VALUES.COMPLETED) {
    todosToShow = todos.filter((todo) => todo.completed)
  }

  const handleOnReorder = (todos) => {
    if (filter !== 'all') return
    dispatch(todoActions.orderTodos(todos))
  }

  if (todosToShow.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-4 bg-white dark:bg-zinc-800 rounded-t-md shadow-neutral-900 hover:bg-gray-50 dark:text-white dark:hover:bg-zinc-700">
        <p className="font-bold text-md ">There no are anythings</p>
      </div>
    )
  }

  return (
    <TodoContent>
      <Reorder.Group axis="y" values={todos} onReorder={handleOnReorder}>
        <AnimatePresence>
          {todosToShow.map((item, index) => (
            <Reorder.Item key={item.id} value={item}>
              <TodoItem todo={item} index={index} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </TodoContent>
  )
}
