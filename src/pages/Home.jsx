import { useEffect, useRef } from "react"
import {
  ArrowRight,
  Blocks,
  Box,
  Braces,
  Command,
  FileJson,
  GitBranch,
  Layers,
  Play,
  Search,
  TriangleAlert,
  Type,
} from "lucide-react"

import { categories, totals } from "../data/manual"
import Reveal from "../components/Reveal"
import SuggestionBox from "../components/SuggestionBox"
import { useI18n } from "../i18n/useI18n"

const ICONS = {
  box: Box,
  type: Type,
  layers: Layers,
  branch: GitBranch,
  braces: Braces,
  alert: TriangleAlert,
  file: FileJson,
  blocks: Blocks,
}

function CategoryCard({ cat, index, onSelect }) {
  const { t, tr } = useI18n()
  const Icon = ICONS[cat.icon] || Box
  const catL = tr(cat)
  return (
    <Reveal delay={index * 70}>
      <button
        onClick={() => onSelect(cat.id)}
        className="group flex h-full w-full flex-col rounded-3xl border border-line bg-surface/40 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-linestrong hover:bg-surface hover:shadow-apple-lift sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-apple to-apple-2 text-apple-contrast shadow-apple-soft">
            <Icon className="h-5.5 w-5.5" />
          </span>
          <span className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[11.5px] font-medium text-ink-faint">
            {t("card_count", { n: cat.topics.length })}
          </span>
        </div>
        <h2 className="text-[19px] font-semibold tracking-tight text-ink">
          {catL.title}
        </h2>
        <p className="mt-0.5 text-[13px] font-medium text-apple">{catL.short}</p>
        <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft">
          {catL.blurb}
        </p>
        <span className="mt-5 flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors group-hover:text-apple">
          {t("card_view")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </Reveal>
  )
}

export default function Home({ onSelectCategory, onSearch, onPlayground }) {
  const { t, lang } = useI18n()
  const glowRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          const y = Math.min(window.scrollY, 900)
          glowRef.current.style.transform = `translate(-50%, ${y * 0.18}px) scale(${
            1 + y * 0.0003
          })`
        }
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const steps = [
    { n: "1", icon: Search, title: t("step1_title"), body: t("step1_body") },
    { n: "2", icon: Box, title: t("step2_title"), body: t("step2_body") },
    { n: "3", icon: Play, title: t("step3_title"), body: t("step3_body") },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[920px] rounded-[100%] bg-gradient-to-br from-apple/15 via-apple-2/10 to-transparent blur-3xl will-change-transform"
          style={{ transform: "translate(-50%, 0)" }}
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-[13px] font-medium text-ink-soft backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" />
              {t("hero_badge")}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[44px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[68px]">
              {t("hero_title_pre")}
              <span className="bg-gradient-to-b from-ink to-ink-soft bg-clip-text text-transparent">
                {t("hero_title_hi")}
              </span>
              {t("hero_title_suf")}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              {t("hero_sub")}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={onSearch}
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-apple px-6 text-[15px] font-medium text-apple-contrast shadow-apple-lift transition-all hover:bg-apple-deep sm:w-auto"
              >
                <Search className="h-4.5 w-4.5" />
                {t("hero_search")}
                <kbd className="hidden items-center gap-0.5 rounded-md bg-apple-contrast/20 px-1.5 py-0.5 font-sans text-[11px] sm:flex">
                  <Command className="h-3 w-3" />K
                </kbd>
              </button>
              <button
                onClick={() => onSelectCategory(categories[0].id)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-linestrong px-6 text-[15px] font-medium text-ink transition-colors hover:bg-surface sm:w-auto"
              >
                {t("hero_explore")}
              </button>
            </div>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-ink-faint">
              <span>
                <strong className="font-semibold text-ink">{totals.topics}</strong>{" "}
                {t("stat_cards")}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-faint/50 sm:block" />
              <span>
                <strong className="font-semibold text-ink">{totals.categories}</strong>{" "}
                {t("stat_categories")}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-faint/50 sm:block" />
              <span>
                <strong className="font-semibold text-ink">{t("stat_exec")}</strong>{" "}
                {t("stat_browser")}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cómo se usa */}
      <section className="border-t border-line bg-surface/60 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal>
            <p className="text-center text-[12px] font-semibold tracking-widest text-ink-faint uppercase">
              {t("how_kicker")}
            </p>
            <h2 className="mt-2 text-center text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
              {t("how_title")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="h-full rounded-3xl border border-line bg-canvas p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-apple to-apple-2 text-[13px] font-bold text-apple-contrast">
                      {step.n}
                    </span>
                    <h3 className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                      <step.icon className="h-4 w-4 text-apple" />
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-widest text-ink-faint uppercase">
            {t("manual_kicker")}
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
            {t("manual_title")}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              index={i}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <Reveal>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-apple via-apple-deep to-apple p-px shadow-apple-pop">
            <div className="rounded-[calc(2.5rem-1px)] bg-canvas px-6 py-14 text-center sm:py-16">
              <h2 className="text-[28px] font-bold tracking-tight text-ink sm:text-[36px]">
                {t("cta_title")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink-soft">
                {t("cta_body")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => onPlayground()}
                  className="flex h-11 items-center justify-center gap-2 rounded-full bg-apple px-6 text-[15px] font-medium text-apple-contrast shadow-apple-lift transition-all hover:bg-apple-deep"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {t("cta_playground")}
                </button>
                <button
                  onClick={() => onSelectCategory(categories[0].id)}
                  className="flex h-11 items-center justify-center gap-2 rounded-full border border-ink/25 px-6 text-[15px] font-medium text-ink transition-colors hover:bg-surface"
                >
                  {t("cta_fundamentals")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SuggestionBox
        pageTitle={lang === "es" ? "Página de inicio" : "Home page"}
      />

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-[12.5px] text-ink-faint sm:flex-row sm:justify-between lg:px-8">
          <p>
            Pyke · {t("footer_built_with")}{" "}
            <span className="font-medium text-ink-soft">React, Tailwind</span> y{" "}
            <span className="font-medium text-ink-soft">Pyodide</span>
          </p>
          <p>{t("footer_lang_note")}</p>
        </div>
      </footer>
    </div>
  )
}