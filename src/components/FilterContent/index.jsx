export default function FilterContent({ children }) {
  const defaultClasses =
    'flex justify-between items-center py-4 bg-zinc-800 relative rounded-b-md justify-around todoItem z-10'
  const mdClasses = 'md:justify-around md:py-0 md:px-8'

  return <div className={`${defaultClasses} ${mdClasses}`}>{children}</div>
}
