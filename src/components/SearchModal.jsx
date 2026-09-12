import { useEffect, useMemo, useRef, useState } from "react"
import { Command, CornerDownLeft, Search, X } from "lucide-react"

import { allTopics } from "../data/manual"
import { useI18n } from "../i18n/useI18n"

const haystack = (category, topic) => {
  const code = topic.blocks
    .filter((b) => b.type === "code")
    .map((b) => b.code + (b.en?.code ? "\n" + b.en.code : ""))
    .join("\n")
  return [
    category.title,
    category.short,
    category.en?.title,
    category.en?.short,
    topic.title,
    topic.desc,
    topic.en?.title,
    topic.en?.desc,
    code,
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase()
}

export default function SearchModal({ open, onClose, onSelect }) {
  const { t, tr } = useI18n()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return allTopics()
      .filter(({ category, topic }) => haystack(category, topic).includes(q))
      .slice(0, 40)
  }, [query])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === "Enter" && results[active]) {
        e.preventDefault()
        onSelect(results[active].category.id, results[active].topic.id)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, active, onSelect, onClose])

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: "nearest" })
  }, [active])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl animate-scale-in overflow-hidden rounded-3xl bg-canvas shadow-apple-pop ring-1 ring-line">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="h-5 w-5 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder={t("search_input_placeholder")}
            className="h-14 w-full bg-transparent text-[17px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery("")} aria-label={t("search_clear")}>
              <X className="h-4.5 w-4.5 text-ink-faint" />
            </button>
          ) : (
            <kbd className="hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink-faint sm:block">
              Esc
            </kbd>
          )}
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-auto p-2">
          {results.length === 0 ? (
            query.trim() ? (
              <p className="px-4 py-8 text-center text-[14px] text-ink-faint">
                {t("search_none", { q: query })}
              </p>
            ) : (
              <div className="px-4 pb-3 pt-4">
                <p className="mb-3 flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-ink-faint uppercase">
                  <Command className="h-3.5 w-3.5" />
                  {t("search_hint")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {["variable", "f-string", "slice", "try except", "csv", "lambda"].map(
                    (s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
                      >
                        {s}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )
          ) : (
            <ul>
              {results.map(({ category, topic }, i) => {
                const catL = tr(category)
                const topL = tr(topic)
                return (
                <li key={`${category.id}/${topic.id}`} data-index={i}>
                  <button
                    onClick={() => onSelect(category.id, topic.id)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      i === active ? "bg-surface" : ""
                    }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-[11px] font-bold text-ink-soft">
                      {catL.short.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-ink">
                        {topL.title}
                      </span>
                      <span className="block truncate text-[12.5px] text-ink-faint">
                        {catL.title} · {topL.desc}
                      </span>
                    </span>
                    {i === active && (
                      <CornerDownLeft className="h-4 w-4 shrink-0 text-ink-faint" />
                    )}
                  </button>
                </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 text-[11px] text-ink-faint">
          <span>
            <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono">↑↓</kbd>{" "}
            {t("search_nav")}
          </span>
          <span>
            <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono">↵</kbd>{" "}
            {t("search_open")}
          </span>
          <span>
            <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono">esc</kbd>{" "}
            {t("search_close")}
          </span>
          <span className="ml-auto">{t("search_results", { n: results.length })}</span>
        </div>
      </div>
    </div>
  )
}