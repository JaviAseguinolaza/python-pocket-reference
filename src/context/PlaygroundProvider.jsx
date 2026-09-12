import { lazy, Suspense, useState } from "react"

import { PlaygroundContext } from "./PlaygroundContext"

const Playground = lazy(() => import("../components/Playground"))

export function PlaygroundProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialCode, setInitialCode] = useState("")

  const openPlayground = (code = "") => {
    setInitialCode(code)
    setIsOpen(true)
  }

  const closePlayground = () => {
    setIsOpen(false)
    setInitialCode("")
  }

  return (
    <PlaygroundContext.Provider value={{ openPlayground }}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <Playground
            isOpen={isOpen}
            initialCode={initialCode}
            onClose={closePlayground}
          />
        </Suspense>
      )}
    </PlaygroundContext.Provider>
  )
}