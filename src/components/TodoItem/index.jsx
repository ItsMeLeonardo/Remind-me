import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

import { useDispatch } from 'react-redux'
import { todoActions } from '../../store'

import CheckIcon from '../../Icons/CheckIcon'
import CloseIcon from '../../Icons/CloseIcon'

const checkboxStyles = {
  checked: 'checked:from-indigo-500 checked:to-purple-500 checked:border-none',
}

const rowVariants = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay: custom * 0.05,
    },
  }),
  deleted: {
    scale: 0.5,
  },
}

const iconVariants = {
  completed: {
    scale: 1,
  },
  incomplete: {
    scale: 0.5,
  },
}

function TodoItem({ todo, index } = {}) {
  const dispatch = useDispatch()

  const controls = useAnimation()

  const isCompleted = todo.completed

  useEffect(() => {
    if (isCompleted) {
      controls.start('completed')
    } else {
      controls.start('incomplete')
    }
  }, [isCompleted])

  const toggleComplete = async () => {
    dispatch(todoActions.toggleTodo(todo.id))
  }

  const handleDelete = async () => {
    dispatch(todoActions.deleteTodo(todo.id))
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={rowVariants}
      exit="deleted"
      whileDrag={{ background: '#000' }}
      custom={index}
      layoutId={todo.id}
      className="flex items-center justify-between gap-4 p-4 rounded hover:bg-gray-50 hover:cursor-grab active:shadow-3xl active:cursor-grabbing dark:text-white dark:hover:bg-zinc-700"
    >
      <motion.div
        animate={controls}
        variants={iconVariants}
        className={`bg-transparent w-6 h-6 flex relative justify-center items-center rounded-full cursor-pointer ${
          !isCompleted && 'border-2  border-gray-500'
        }`}
      >
        {isCompleted && <CheckIcon className="absolute text-white dark:text-zinc-800" />}
        <motion.input
          type="checkbox"
          checked={isCompleted}
          onChange={toggleComplete}
          id={todo.id}
          className={`bg-gradient-to-r ${checkboxStyles.checked} appearance-none w-6 h-6 rounded-full cursor-pointer`}
        />
      </motion.div>
      <label htmlFor={todo.id} className="cursor-pointer text-sm w-full">
        {todo.text}
      </label>
      <motion.button
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.125 }}
        whileTap={{ scale: 0.875 }}
        aria-label="delete"
        onClick={handleDelete}
        className="rounded-full p-2 flex justify-center items-center group transform transition duration-500 hover:bg-pink-500 shadow-lg hover:shadow-pink-500/50 active:scale-90"
      >
        <CloseIcon className="text-zinc-800 group-hover:text-white transition duration-500 dark:text-white" />
      </motion.button>
    </motion.div>
  )
}

export default React.memo(TodoItem)
