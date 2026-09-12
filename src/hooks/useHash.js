import { useEffect, useState } from "react"

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash || "#/")

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/")
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  const navigate = (h) => {
    window.location.hash = h
  }

  return { hash, navigate }
}