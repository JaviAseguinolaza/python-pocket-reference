import { useEffect, useRef, useState } from "react"
import { Download } from "lucide-react"

import { useI18n } from "../i18n/useI18n"

const isIOS = () =>
  /iP(hone|ad|od)/.test(navigator.platform) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

const isStandalone = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(display-mode: standalone)").matches

export default function InstallButton() {
  const { t } = useI18n()
  const [deferred, setDeferred] = useState(null)
  const [hintOpen, setHintOpen] = useState(false)
  const hintRef = useRef(null)

  useEffect(() => {
    const onBefore = (e) => {
      e.preventDefault()
      setDeferred(e)
    }
    const onInstalled = () => setDeferred(null)
    window.addEventListener("beforeinstallprompt", onBefore)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBefore)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  useEffect(() => {
    if (!hintOpen) return
    const onDown = (e) => {
      if (hintRef.current && !hintRef.current.contains(e.target)) {
        setHintOpen(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [hintOpen])

  if (isStandalone()) return null

  const showPromptable = !!deferred
  const showIosHint = !deferred && isIOS()

  if (!showPromptable && !showIosHint) return null

  const doInstall = async () => {
    if (!deferred) return
    await deferred.prompt()
    const choice = await deferred.userChoice
    if (choice?.outcome === "accepted") setDeferred(null)
  }

  if (showPromptable) {
    return (
      <button
        onClick={doInstall}
        className="flex h-9 items-center gap-2 rounded-xl bg-apple px-3.5 text-[13px] font-medium text-apple-contrast shadow-apple-soft transition-all hover:bg-apple-deep"
        aria-label={t("install_label")}
      >
        <Download className="h-4 w-4" />
        {t("install_label")}
      </button>
    )
  }

  return (
    <div className="relative" ref={hintRef}>
      <button
        onClick={() => setHintOpen((o) => !o)}
        className="flex h-9 items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 text-[13px] text-ink-soft transition-all hover:border-linestrong hover:text-ink"
        aria-label={t("install_label")}
      >
        <Download className="h-4 w-4" />
        <span className="hidden md:inline">{t("install_label")}</span>
      </button>
      {hintOpen && (
        <div className="absolute right-0 top-11 z-50 w-64 animate-scale-in rounded-2xl border border-line bg-canvas p-4 shadow-apple-pop">
          <p className="text-[13px] leading-relaxed text-ink">
            {t("install_ios_hint")}
          </p>
        </div>
      )}
    </div>
  )
}