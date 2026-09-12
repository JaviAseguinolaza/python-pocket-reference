import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1"
  if (location.protocol === "https:" || isLocal) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        /* noop */
      })
    })
  }
}