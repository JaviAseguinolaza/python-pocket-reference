import { useEffect, useState } from "react"

import { getHeadingId } from "../lib/text"
import { useI18n } from "../i18n/useI18n"

export default function RightIndex({ topic }) {
  const { t, tr } = useI18n()
  const headings = (topic.blocks || [])
    .filter((b) => b.type === "h")
    .map((b) => ({ id: getHeadingId(b.text), text: tr(b).text }))

  const [active, setActive] = useState(headings[0]?.id || "")

  useEffect(() => {
    setActive(headings[0]?.id || "")
    if (headings.length === 0) return

    const onScroll = () => {
      let current = headings[0]?.id || ""
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top - 120 <= 0) current = h.id
      }
      // Si estamos cerca del final, marca el último
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        current = headings[headings.length - 1].id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label={t("on_this_page")}
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto"
    >
      <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-ink-faint uppercase">
        {t("on_this_page")}
      </p>
      <ul className="space-y-0.5 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document
                  .getElementById(h.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={`block border-l-2 px-3 py-1 text-[12.5px] leading-snug transition-colors ${
                active === h.id
                  ? "-ml-px border-apple font-medium text-apple"
                  : "border-transparent text-ink-faint hover:text-ink-soft"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}