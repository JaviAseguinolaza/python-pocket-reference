import { useCallback, useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme")
      if (saved) return saved
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    } catch {
      return "light"
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    try {
      localStorage.setItem("theme", theme)
    } catch {
      /* noop */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"))
  }, [])

  return { theme, toggle }
}