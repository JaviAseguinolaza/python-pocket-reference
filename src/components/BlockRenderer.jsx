import { Info, KeyRound, Lightbulb, TriangleAlert } from "lucide-react"

import CodeBlock from "./CodeBlock"
import Inline from "./Inline"
import { useI18n } from "../i18n/useI18n"

const NOTE_STYLES = {
  tip: {
    icon: Lightbulb,
    wrap: "border-line bg-[#f2f2f5] text-ink dark:bg-[#15151a]",
    title: "text-ink",
  },
  warning: {
    icon: TriangleAlert,
    wrap:
      "border-[#e6b800]/25 bg-[#fdf6e3] text-ink dark:border-[#febc2e]/25 dark:bg-[#241c0b]",
    title: "text-[#9c7400] dark:text-[#febc2e]",
  },
  info: {
    icon: Info,
    wrap: "border-line bg-surface/70 text-ink",
    title: "text-ink-soft",
  },
  key: {
    icon: KeyRound,
    wrap:
      "border-linestrong bg-gradient-to-r from-surface2/70 to-transparent text-ink dark:from-[#1a1a1f]/70",
    title: "text-ink",
  },
}

function Note({ tone, title, text }) {
  const style = NOTE_STYLES[tone] || NOTE_STYLES.info
  const Icon = style.icon
  return (
    <div
      className={`flex gap-3.5 rounded-2xl border p-4 sm:p-5 ${style.wrap}`}
    >
      <span className="mt-0.5 shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        {title && (
          <p className={`mb-1 text-[14px] font-semibold ${style.title}`}>
            {title}
          </p>
        )}
        <div className="text-[14.5px] leading-relaxed text-ink">
          <Inline text={text} />
        </div>
      </div>
    </div>
  )
}

function DataTable({ caption, headers, rows }) {
  return (
    <div>
      {caption && (
        <p className="mb-2 px-1 text-[12px] font-semibold tracking-wide text-ink-faint uppercase">
          {caption}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[520px] border-collapse bg-canvas text-left">
          <thead>
            <tr className="bg-surface/70">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-[12px] font-semibold tracking-wide text-ink-soft uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row, i) => (
              <tr key={i} className="text-[13.5px] text-ink transition-colors hover:bg-surface/50">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2.5 align-top ${
                      j === 0 ? "font-mono font-medium text-apple dark:text-apple-2" : "text-ink-soft"
                    }`}
                  >
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function BlockRenderer({ block }) {
  const { tr } = useI18n()
  const b = tr(block)
  switch (b.type) {
    case "p":
      return (
        <p className="text-[15.5px] leading-[1.75] text-ink-soft">
          <Inline text={b.text} />
        </p>
      )
    case "h":
      return (
        <h3
          id={b.id}
          className="mb-3 mt-2 scroll-mt-24 text-[22px] font-semibold tracking-tight text-ink"
        >
          {b.text}
        </h3>
      )
    case "code":
      return (
        <CodeBlock code={b.code} title={b.title} run={b.run !== false} />
      )
    case "note":
      return <Note tone={b.tone} title={b.title} text={b.text} />
    case "list":
      return (
        <div>
          {b.title && (
            <p className="mb-2 text-[13px] font-semibold text-ink-soft">{b.title}</p>
          )}
          <ul className="space-y-2.5">
            {b.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft"
              >
                <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-apple/60" />
                <span>
                  <Inline text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )
    case "table":
      return <DataTable caption={b.caption} headers={b.headers} rows={b.rows} />
    default:
      return null
  }
}