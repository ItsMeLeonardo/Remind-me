export default function TodoContent({ children }) {
  return (
    <ul className="flex flex-col w-full bg-zinc-800 rounded-t-md shadow-neutral-900">
      {children}
    </ul>
  )
}
