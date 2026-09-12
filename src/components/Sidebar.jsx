import { Check, Circle } from "lucide-react"

import { allTopics, categories } from "../data/manual"
import { useI18n } from "../i18n/useI18n"

function ProgressSummary({ read }) {
  const { t } = useI18n()
  const total = allTopics().length
  const done = read.size
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="mb-4 px-2">
      <div className="flex items-center justify-between text-[12px] font-semibold text-ink-soft">
        <span>{t("progress_label")}</span>
        <span className="font-mono text-ink-faint">
          {done}/{total}
        </span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-surface2">
        <div
          className="h-full rounded-full bg-apple transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function SidebarInner({ categoryId, topicId, onNavigate, read }) {
  const { t, tr } = useI18n()
  const isRead = (id) => read.has(id)
  return (
    <nav aria-label={t("nav_label")}>
      {categories.map((cat) => {
        const catL = tr(cat)
        const isActiveCat = cat.id === categoryId
        return (
          <div key={cat.id} className="mb-5">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                onNavigate("#/")
              }}
              className={`mb-1.5 flex items-center gap-2 px-2 text-[12px] font-semibold tracking-wide uppercase ${
                isActiveCat ? "text-apple" : "text-ink-faint"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
              {catL.title}
            </a>
            <ul className="space-y-px">
              {cat.topics.map((topic) => {
                const key = `${cat.id}/${topic.id}`
                const isActive = cat.id === categoryId && topic.id === topicId
                const done = isRead(key)
                const topL = tr(topic)
                return (
                  <li key={topic.id}>
                    <a
                      href={`#/${cat.id}/${topic.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        onNavigate(`#/${cat.id}/${topic.id}`)
                      }}
                      className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13.5px] transition-colors ${
                        isActive
                          ? "bg-apple font-medium text-apple-contrast"
                          : "text-ink-soft hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span className="block flex-1 truncate">{topL.title}</span>
                      {done ? (
                        <Check
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isActive
                              ? "text-apple-contrast/80"
                              : "text-apple"
                          }`}
                        />
                      ) : (
                        <Circle
                          className={`h-3 w-3 shrink-0 opacity-40 ${
                            isActive ? "text-apple-contrast/50" : "text-ink-faint"
                          }`}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export default function Sidebar({
  categoryId,
  topicId,
  onNavigate,
  read,
  className = "",
}) {
  return (
    <div className={className}>
      <ProgressSummary read={read} />
      <SidebarInner
        categoryId={categoryId}
        topicId={topicId}
        onNavigate={onNavigate}
        read={read}
      />
    </div>
  )
}