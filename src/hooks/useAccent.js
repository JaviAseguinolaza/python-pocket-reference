import { useCallback, useEffect, useState } from "react"

const ACCENTS = ["graphite", "blue", "green", "violet", "orange"]

export function useAccent() {
  const [accent, setAccent] = useState(() => {
    try {
      return localStorage.getItem("pyke:accent") || "graphite"
    } catch {
      return "graphite"
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (accent === "graphite") root.removeAttribute("data-accent")
    else root.setAttribute("data-accent", accent)
    try {
      localStorage.setItem("pyke:accent", accent)
    } catch {
      /* noop */
    }
  }, [accent])

  const change = useCallback((a) => setAccent(a), [])

  return { accent, change, ACCENTS }
}