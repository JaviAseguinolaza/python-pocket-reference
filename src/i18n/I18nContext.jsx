import { useCallback, useEffect, useMemo, useState } from "react"

import { translations } from "./translations"
import { I18nContext } from "./context"

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("pyke:lang")
      return saved === "en" || saved === "es" ? saved : "es"
    } catch {
      return "es"
    }
  })

  const t = useCallback(
    (key, vars) => {
      let s = translations[lang]?.[key] ?? translations.es[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replace(`{${k}}`, String(v))
        }
      }
      return s
    },
    [lang],
  )

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem("pyke:lang", lang)
    } catch {
      /* noop */
    }
  }, [lang])

  const tr = useCallback(
    (obj) => (lang === "en" && obj && obj.en ? { ...obj, ...obj.en } : obj),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}