import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { SunIcon, MoonIcon } from '../../Icons/ThemeIcons'
import { useToggle } from '../../hooks/useToggle'

export default function index() {
  const [isDarkMode, setDarkMode] = useToggle()

  useEffect(() => {
    const htmlRoot = document.querySelector('html')
    if (isDarkMode) {
      htmlRoot.classList.add('dark')
    } else {
      htmlRoot.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <header className="w-11/12 flex items-center justify-between mb-6 md:w-9/12 lg:w-6/12 py-4">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="dark:text-white text-2xl tracking-wide font-bold"
      >
        Remind Me
      </motion.h1>
      <button
        onClick={setDarkMode}
        className="group p-2 transition duration-500 rounded-full hover:shadow-lg  hover:shadow-gray-100 hover:bg-white"
      >
        {isDarkMode ? (
          <SunIcon className="text-white transition duration-500 group-hover:text-zinc-800" />
        ) : (
          <MoonIcon className="" />
        )}
      </button>
    </header>
  )
}
