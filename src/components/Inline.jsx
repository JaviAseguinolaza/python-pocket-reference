import { Fragment } from "react"

// Convierte `code` y **bold** (y *italic*) en elementos React.
export default function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return (
            <code
              key={i}
              className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-apple dark:text-apple-2"
            >
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i} className="italic text-ink-soft">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}