import { useContext } from "react"

import { PlaygroundContext } from "./PlaygroundContext"

export function usePlayground() {
  return useContext(PlaygroundContext)
}