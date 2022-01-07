export default function TodoContent({ children }) {
  return (
    <ul className="flex flex-col w-full bg-white dark:bg-zinc-800 rounded-t-md shadow-neutral-900">
      {children}
    </ul>
  )
}
