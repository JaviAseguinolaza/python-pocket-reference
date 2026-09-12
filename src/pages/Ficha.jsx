import { useEffect, useMemo } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react"

import { allTopics, getCategory } from "../data/manual"
import BlockRenderer from "../components/BlockRenderer"
import Quiz from "../components/Quiz"
import Reveal from "../components/Reveal"
import SuggestionBox from "../components/SuggestionBox"
import { getHeadingId } from "../lib/text"
import { useI18n } from "../i18n/useI18n"

export default function Ficha({
  category,
  topic,
  onNavigate,
  isRead,
  onToggleRead,
}) {
  const { t, tr } = useI18n()

  // Asignamos ids estables a los h antes de renderizar
  const blocks = useMemo(
    () =>
      topic.blocks.map((b) =>
        b.type === "h" ? { ...b, id: getHeadingId(b.text) } : b,
      ),
    [topic],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    document.title = `${tr(topic).title} · Pyke`
  }, [topic, tr])

  const neighbors = useMemo(() => {
    const flat = allTopics()
    const idx = flat.findIndex((x) => x.topic.id === topic.id && x.category.id === category.id)
    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    }
  }, [category, topic])

  return (
    <article>
      <nav className="mb-5 flex items-center gap-2 text-[13px] text-ink-faint">
        <button
          onClick={() => onNavigate("#/")}
          className="transition-colors hover:text-apple"
        >
          {t("breadcrumb_manual")}
        </button>
        <span className="text-ink-faint/60">/</span>
        <span className="font-medium text-ink-soft">{tr(category).title}</span>
      </nav>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-[34px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
          {tr(topic).title}
        </h1>
        <button
          onClick={onToggleRead}
          aria-pressed={isRead}
          className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
            isRead
              ? "border-transparent bg-apple text-apple-contrast"
              : "border-line bg-surface/60 text-ink-soft hover:border-linestrong hover:text-ink"
          }`}
        >
          {isRead ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Circle className="h-3.5 w-3.5" />
          )}
          {isRead ? t("read_done") : t("mark_read")}
        </button>
      </div>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
        {tr(topic).desc}
      </p>

      <div className="mt-8 space-y-6">
        {blocks.map((b, i) => (
          <Reveal key={i} className="toc-anchor" delay={(i % 3) * 70}>
            <BlockRenderer block={b} />
          </Reveal>
        ))}
      </div>

      {topic.quiz && topic.quiz.length > 0 && <Quiz quiz={topic.quiz} />}

      {/* Footer nav */}
      <div className="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {neighbors.prev ? (
          <Reveal>
            <button
              onClick={() =>
                onNavigate(`#/${neighbors.prev.category.id}/${neighbors.prev.topic.id}`)
              }
              className="group flex w-full flex-col items-start rounded-2xl border border-line bg-surface/50 p-4 text-left transition-all hover:border-linestrong hover:shadow-apple-soft"
            >
              <span className="flex items-center gap-1 text-[12px] text-ink-faint">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                {t("prev_note")}
              </span>
              <span className="mt-1 text-[15px] font-semibold text-ink">
                {tr(neighbors.prev.topic).title}
              </span>
              <span className="text-[12.5px] text-ink-faint">
                {tr(neighbors.prev.category).title}
              </span>
            </button>
          </Reveal>
        ) : (
          <span />
        )}
        {neighbors.next && (
          <Reveal delay={80}>
            <button
              onClick={() =>
                onNavigate(`#/${neighbors.next.category.id}/${neighbors.next.topic.id}`)
              }
              className="group flex w-full flex-col items-end rounded-2xl border border-line bg-surface/50 p-4 text-right transition-all hover:border-linestrong hover:shadow-apple-soft"
            >
              <span className="flex items-center gap-1 text-[12px] text-ink-faint">
                {t("next_note")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-1 text-[15px] font-semibold text-ink">
                {tr(neighbors.next.topic).title}
              </span>
              <span className="text-[12.5px] text-ink-faint">
                {tr(neighbors.next.category).title}
              </span>
            </button>
          </Reveal>
        )}
      </div>

      <p className="mt-10 pb-2 text-center text-[12px] text-ink-faint">
        {t("visited_footer", {
          title: tr(topic).title,
          category: tr(getCategory(category.id))?.title,
        })}
      </p>

      <SuggestionBox pageTitle={tr(topic).title} />

      <p className="text-center text-[12px] text-ink-faint">{t("bug_hint")}</p>
    </article>
  )
}