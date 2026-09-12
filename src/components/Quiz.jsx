import { useMemo, useState } from "react"
import { CheckCircle2, Circle, RotateCcw, Trophy, XCircle } from "lucide-react"

import { useI18n } from "../i18n/useI18n"
import Reveal from "./Reveal"

export default function Quiz({ quiz }) {
  const { t, tr } = useI18n()
  const questions = useMemo(() => quiz || [], [quiz])

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = tr(questions[current])
  const isCorrect = selected != null && selected === q?.answer
  const ok = useMemo(
    () =>
      questions.filter((qq, i) => answers[i] != null && answers[i] === qq.answer)
        .length,
    [answers, questions],
  )

  if (questions.length === 0) return null

  const check = () => {
    if (selected === null) return
    setChecked(true)
    setAnswers((prev) => {
      const nextArr = prev.slice()
      nextArr[current] = selected
      return nextArr
    })
  }

  const next = () => {
    if (current < questions.length - 1) {
      const nextIndex = current + 1
      setCurrent(nextIndex)
      setSelected(answers[nextIndex] != null ? answers[nextIndex] : null)
      setChecked(false)
    } else {
      setDone(true)
    }
  }

  const restart = () => {
    setCurrent(0)
    setSelected(null)
    setChecked(false)
    setAnswers([])
    setDone(false)
  }

  if (done) {
    const percentage = Math.round((ok / questions.length) * 100)
    return (
      <Reveal>
        <div
          aria-live="polite"
          className="mt-10 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8"
        >
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-apple to-apple-2 text-apple-contrast shadow-apple-soft">
              <Trophy className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-[22px] font-bold tracking-tight text-ink">
              {t("quiz_title")} · {t("quiz_finish")}
            </h2>
            <p className="mt-1 text-[15px] text-ink-soft">
              {t("quiz_result", { ok, total: questions.length })}
            </p>
            <div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-apple to-apple-2 transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <button
              onClick={restart}
              className="mt-6 flex h-10 items-center gap-2 rounded-full border border-linestrong px-5 text-[13.5px] font-medium text-ink transition-colors hover:bg-surface"
            >
              <RotateCcw className="h-4 w-4" />
              {t("quiz_restart")}
            </button>
          </div>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal>
      <section
        aria-label={t("quiz_title")}
        className="mt-10 rounded-3xl border border-line bg-surface/50 p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-ink">
              {t("quiz_title")}
            </h2>
            <p className="mt-0.5 text-[13.5px] text-ink-soft">{t("quiz_sub")}</p>
          </div>
          <span className="shrink-0 rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[12px] text-ink-faint">
            {current + 1}/{questions.length}
          </span>
        </div>

        <div className="mt-6 h-1 overflow-hidden rounded-full bg-surface2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-apple to-apple-2 transition-all duration-500"
            style={{
              width: `${((current + (checked ? 1 : 0)) / questions.length) * 100}%`,
            }}
          />
        </div>

        <p className="mt-6 text-[16px] font-medium text-ink">{q.q}</p>

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer
            const isChosen = i === selected
            let cls =
              "border-line bg-canvas text-ink hover:border-linestrong hover:bg-surface"
            if (checked) {
              if (isAnswer) cls = "border-apple/60 bg-apple/10 text-ink"
              else if (isChosen) cls = "border-[#b4231c]/40 bg-[#b4231c]/5 text-ink"
              else cls = "border-line bg-canvas text-ink-soft opacity-60"
            } else if (isChosen) {
              cls = "border-linestrong bg-surface text-ink"
            }
            return (
              <button
                key={i}
                onClick={() => {
                  if (!checked) setSelected(i)
                }}
                aria-pressed={isChosen}
                disabled={checked}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[14.5px] transition-all disabled:cursor-default ${cls}`}
              >
                <span
                  className={`shrink-0 ${
                    isChosen && !checked
                      ? "text-apple"
                      : checked && isAnswer
                        ? "text-apple"
                        : "text-ink-faint"
                  }`}
                >
                  {checked && isAnswer ? (
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  ) : checked && isChosen && !isAnswer ? (
                    <XCircle className="h-4.5 w-4.5 text-[#b4231c] dark:text-[#ff9d9d]" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[20px]">
            {checked && (
              <p
                aria-live="polite"
                className={`flex items-center gap-1.5 text-[13.5px] font-medium ${
                  isCorrect
                    ? "text-[#1a7f37] dark:text-[#3fb950]"
                    : "text-[#b4231c] dark:text-[#ff9d9d]"
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> {t("quiz_correct")}
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" /> {t("quiz_wrong")}
                  </>
                )}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {!checked ? (
              <button
                onClick={check}
                disabled={selected === null}
                className="flex h-10 items-center rounded-full bg-apple px-5 text-[13.5px] font-medium text-apple-contrast shadow-apple-soft transition-all hover:bg-apple-deep disabled:opacity-50"
              >
                {t("quiz_check")}
              </button>
            ) : (
              <button
                onClick={next}
                className="flex h-10 items-center rounded-full bg-apple px-5 text-[13.5px] font-medium text-apple-contrast shadow-apple-soft transition-all hover:bg-apple-deep"
              >
                {current < questions.length - 1 ? t("quiz_next") : t("quiz_finish")}
              </button>
            )}
          </div>
        </div>

        {checked && q.explain && (
          <div
            className={`mt-4 rounded-xl border p-3.5 text-[13.5px] leading-relaxed ${
              isCorrect
                ? "border-[#1a7f37]/25 bg-[#f0fbf3] text-ink dark:border-[#3fb950]/25 dark:bg-[#0d2417]"
                : "border-[#e6b800]/25 bg-[#fdf6e3] text-ink dark:border-[#febc2e]/25 dark:bg-[#241c0b]"
            }`}
          >
            <span className="font-semibold text-ink-faint">
              {q.explain}
            </span>
          </div>
        )}
      </section>
    </Reveal>
  )
}