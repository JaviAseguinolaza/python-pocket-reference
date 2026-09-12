import { useEffect, useRef, useState } from "react"
import { Check, Moon, Palette, Search, Sun, X, Zap } from "lucide-react"

import { totals } from "../data/manual"
import { useI18n } from "../i18n/useI18n"

const ACCENT_OPTIONS = [
  { id: "graphite", value: "#8e8e93" },
  { id: "blue", value: "#0a84ff" },
  { id: "green", value: "#30d158" },
  { id: "violet", value: "#bf5af2" },
  { id: "orange", value: "#ff9f0a" },
]

export default function TopBar({
  onSearch,
  theme,
  onToggleTheme,
  onHome,
  showMenu,
  onMenu,
  accent,
  onChangeAccent,
}) {
  const { lang, setLang, t } = useI18n()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef(null)

  useEffect(() => {
    if (!settingsOpen) return
    const onDown = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === "Escape") setSettingsOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      window.removeEventListener("keydown", onKey)
    }
  }, [settingsOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-glass backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-5 lg:px-8">
        {showMenu && (
          <button
            onClick={onMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink lg:hidden"
            aria-label={t("menu_open")}
          >
            <span className="block h-1 w-4 rounded-sm bg-current shadow-[0_6px_0_currentColor]" />
          </button>
        )}

        <button
          onClick={onHome}
          className="group flex items-center gap-2.5"
          aria-label={t("home_label")}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-apple to-apple-2 text-apple-contrast shadow-apple-soft transition-transform duration-300 group-hover:scale-105">
            <Zap className="h-4 w-4 fill-current" />
          </span>
          <span className="hidden sm:flex sm:flex-col sm:items-start sm:leading-none">
            <span className="text-[14px] font-semibold tracking-tight text-ink">
              Pyke
            </span>
            <span className="text-[11px] text-ink-faint">
              {t("brand_sub", { n: totals.topics })}
            </span>
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onSearch}
            className="group flex h-9 items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 text-[13px] text-ink-faint transition-all hover:border-linestrong hover:text-ink"
            aria-label={t("search_aria")}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">{t("search_placeholder")}</span>
            <kbd className="hidden items-center gap-0.5 rounded-md border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10.5px] text-ink-faint md:flex">
              <span className="font-sans">⌘</span>K
            </kbd>
          </button>

          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen((o) => !o)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                settingsOpen
                  ? "border-linestrong bg-surface text-ink"
                  : "border-line bg-surface/60 text-ink-soft hover:border-linestrong hover:text-ink"
              }`}
              aria-label={t("settings_label")}
              aria-expanded={settingsOpen}
            >
              <Palette className="h-4 w-4" />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-11 z-50 w-64 animate-scale-in rounded-2xl border border-line bg-canvas p-4 shadow-apple-pop">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-ink">
                    {t("settings_label")}
                  </p>
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface hover:text-ink"
                    aria-label={t("search_close")}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                      {t("lang_label")}
                    </p>
                    <div className="flex gap-1 rounded-xl bg-surface p-1">
                      {[
                        { id: "es", label: t("lang_es"), short: "ES" },
                        { id: "en", label: t("lang_en"), short: "EN" },
                      ].map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setLang(l.id)}
                          aria-pressed={lang === l.id}
                          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium transition-all ${
                            lang === l.id
                              ? "bg-apple text-apple-contrast shadow-apple-soft"
                              : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          <span className="hidden text-[10.5px] opacity-80 sm:inline">
                            {l.short}
                          </span>
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
                      {t("accent_label")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ACCENT_OPTIONS.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => onChangeAccent(a.id)}
                          aria-label={t(`accent_${a.id}`)}
                          aria-pressed={accent === a.id}
                          className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 ${
                            accent === a.id
                              ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas"
                              : ""
                          }`}
                          style={{ backgroundColor: a.value }}
                        >
                          {accent === a.id && (
                            <Check
                              className={`h-4 w-4 ${
                                a.id === "graphite" ? "text-white" : "text-white"
                              }`}
                              strokeWidth={3.5}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface/60 text-ink-soft transition-all hover:border-linestrong hover:text-ink"
            aria-label={t("theme_label")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}