import { useCallback, useState } from "react"

const KEY = "ppr.read"

function loadSet() {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

function persist(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]))
  } catch {
    /* noop */
  }
}

export function useProgress() {
  const [read, setRead] = useState(loadSet)

  const toggle = useCallback((key) => {
    setRead((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      persist(next)
      return next
    })
  }, [])

  return { read, toggle }
}