import { memo } from 'react'

function TextFilterBtn({ onClick, isActive, label }) {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className="font-bold capitalize cursor-pointer hover:text-gray-500 dark:text-white transition disabled:text-indigo-400 dark:disabled:text-indigo-700"
    >
      {label}
    </button>
  )
}

export default memo(TextFilterBtn, (prevProps, nextProps) => {
  prevProps.isActive === nextProps.isActive
})
