const DEFAULT_CLASSES =
  'flex justify-between items-center py-4 bg-white dark:bg-zinc-800 relative rounded-b-md justify-around todoItem z-10'
const MD_CLASSES = 'md:justify-around md:py-0 md:px-8'

export default function FilterContent({ children }) {
  return <div className={`${DEFAULT_CLASSES} ${MD_CLASSES}`}>{children}</div>
}
