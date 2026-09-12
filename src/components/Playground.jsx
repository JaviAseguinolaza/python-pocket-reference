import { useCallback, useEffect, useRef, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { EditorView } from "@codemirror/view"
import { Loader2, Play, RotateCcw, X } from "lucide-react"

import { useI18n } from "../i18n/useI18n"

const PYODIDE_VERSION = "0.26.4"
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

const SAVED_KEY = "ppr.playground.code"
const DEFAULT_CODE = `# Tienes Python de verdad en tu navegador.
# Escribe o pega cualquier ejemplo del manual y pulsa Ejecutar.

print("hola, python")`

function loadSaved() {
  try {
    return localStorage.getItem(SAVED_KEY) || ""
  } catch {
    return ""
  }
}

function saveSaved(code) {
  if (!code) return
  try {
    localStorage.setItem(SAVED_KEY, code)
  } catch {
    /* noop */
  }
}

let pyodidePromise = null
let outputHandler = null

function pushOutput(type, text) {
  if (!outputHandler) return
  const lines = String(text).split("\n")
  for (const line of lines) outputHandler(type, line)
}

async function ensurePyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const script = document.createElement("script")
      script.src = `${PYODIDE_BASE}pyodide.js`
      script.async = true
      document.body.appendChild(script)
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = () => reject(new Error("No se pudo descargar Pyodide"))
      })

      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_BASE })

      pyodide.setStdout({ batched: (text) => pushOutput("out", text) })
      pyodide.setStderr({ batched: (text) => pushOutput("err", text) })

      pyodide.runPython(`
from js import window
def _safe_input(prompt_text=""):
    if prompt_text:
        print(prompt_text, end="")
    raw = window.prompt("Python input()", "")
    return str(raw if raw is not None else "")
import builtins as _b
_b.input = _safe_input
`)

      // Ficheros de ejemplo para las fichas del manual
      pyodide.runPython(`
open("notas.txt", "w", encoding="utf-8").write("Hola Python\\nEsto es una prueba\\nHoy es un buen dia para programar.\\n")
open("datos.json", "w", encoding="utf-8").write('{"nombre": "Ana", "hobbies": ["leer", "python"], "edad": 25}')
open("alumnos.csv", "w", encoding="utf-8").write("nombre,nota\\nAna,9.5\\nLuis,7.2\\n")
open("salida.txt", "w", encoding="utf-8").write("Primera linea\\nSegunda linea\\n")
`)

      return pyodide
    })()
  }
  return pyodidePromise
}

const editorTheme = EditorView.theme(
  {
    "&": {
      height: "100%",
      fontSize: "14px",
      backgroundColor: "transparent",
    },
    ".cm-content": {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      padding: "14px 0",
      caretColor: "#334155",
    },
    "&.cm-focused": { outline: "none" },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "#9ca3af",
      border: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 16px 0 4px",
    },
    ".cm-activeLine": { backgroundColor: "rgba(15,23,42,0.04)" },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(15,23,42,0.04)",
      color: "#6b7280",
    },
    ".cm-cursor": { borderLeftColor: "#334155", borderLeftWidth: "2px" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "rgba(59,130,246,0.25) !important",
    },
    "&.cm-focused .cm-matchingBracket": {
      backgroundColor: "rgba(59,130,246,0.12)",
      outline: "1px solid rgba(59,130,246,0.35)",
    },
    ".cm-scroller": {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      lineHeight: "1.7",
    },
  },
  { dark: false },
)

const extensions = [python(), editorTheme]

function EditorPane({ value, onChange, disabled }) {
  return (
    <div className="h-full">
      <CodeMirror
        value={value}
        height="100%"
        theme="light"
        extensions={extensions}
        onChange={onChange}
        editable={!disabled}
        basicSetup={{
          lineNumbers: true,
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          tabSize: 4,
        }}
        style={{ height: "100%" }}
      />
    </div>
  )
}

export default function Playground({ isOpen, initialCode, onClose }) {
  const { t } = useI18n()
  const [code, setCode] = useState(initialCode || "")
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState("loading") // loading | ready | running
  const [error, setError] = useState("")
  const logRef = useRef(null)
  const runRef = useRef(null)
  const baseRef = useRef("")

  const resetCode = () => {
    setCode(baseRef.current || initialCode || DEFAULT_CODE)
  }

  const append = useCallback((type, text) => {
    if (text === "") return
    setEntries((prev) => [...prev, { type, text }])
  }, [])

  useEffect(() => {
    outputHandler = append
    return () => {
      outputHandler = null
    }
  }, [append])

  useEffect(() => {
    if (!isOpen) return
    const saved = loadSaved()
    baseRef.current = initialCode || saved || DEFAULT_CODE
    setCode(baseRef.current)
    setEntries([])
    setError("")
    const keyHandler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") runRef.current?.()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    saveSaved(code)
  }, [code])

  useEffect(() => {
    if (!isOpen) return
    ensurePyodide()
      .then(() => setStatus("ready"))
      .catch((e) => {
        setError(String(e && e.message ? e.message : e))
        setStatus("ready")
      })
  }, [isOpen])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [entries])

  const run = async () => {
    if (status !== "ready") return
    setEntries([])
    setStatus("running")
    try {
      const pyodide = await ensurePyodide()
      const result = pyodide.runPython(code)
      if (result !== undefined) pushOutput("out", String(result))
    } catch (e) {
      const msg = e && typeof e.message === "string" ? e.message : String(e)
      pushOutput("err", msg)
    } finally {
      setStatus("ready")
    }
  }

  runRef.current = run

  if (!isOpen) return null

  const ready = status !== "loading"

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex h-[min(90vh,820px)] w-[min(96vw,1020px)] animate-scale-in flex-col overflow-hidden rounded-3xl bg-white shadow-apple-pop ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-black/10 px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-apple to-apple-2 text-sm font-bold text-apple-contrast shadow-apple-soft">
            {"</>"}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[15px] font-semibold text-gray-900">
              Playground
            </h2>
            <p className="flex items-center gap-1.5 text-[12px] text-gray-500">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  ready ? "bg-emerald-500" : "animate-pulse bg-amber-500"
                }`}
              />
              Python {PYODIDE_VERSION} · {t("pg_runs_local")}
            </p>
          </div>
          <button
            onClick={run}
            disabled={!ready}
            aria-label={t("pg_run_aria")}
            className="flex h-9 items-center gap-2 rounded-xl bg-apple px-4 text-[14px] font-medium text-apple-contrast transition-all hover:bg-apple-deep disabled:opacity-50"
          >
            {status === "running" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
            {t("pg_run")}
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-900"
            aria-label={t("search_close")}
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Editor */}
          <div className="flex h-[52%] shrink-0 flex-col border-b border-black/10 bg-gray-100/70">
            <div className="flex items-center justify-between px-5 py-2">
              <p className="font-mono text-[12px] tracking-wide text-gray-500">
                {t("pg_code")}
              </p>
              <button
                onClick={resetCode}
                className="flex items-center gap-1 text-[12px] text-gray-500 transition-colors hover:text-gray-900"
              >
                <RotateCcw className="h-3 w-3" />
                {t("pg_reset")}
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <EditorPane value={code} onChange={setCode} disabled={!ready} />
              {!ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3 text-gray-600">
                    <Loader2 className="h-7 w-7 animate-spin text-apple-2" />
                    <p className="text-[13px]">
                      {t("pg_loading")}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {t("pg_loading_hint")}
                    </p>
                  </div>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50/95 p-8">
                  <p className="max-w-md text-center text-[13px] leading-relaxed text-red-700">
                    {t("pg_error_retry")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Console */}
          <div className="flex min-h-0 flex-1 flex-col bg-white">
            <div className="flex items-center justify-between px-5 py-2">
              <p className="font-mono text-[12px] tracking-wide text-gray-500">
                {t("pg_console")}
              </p>
              <button
                onClick={() => setEntries([])}
                className="flex items-center gap-1 text-[12px] text-gray-500 transition-colors hover:text-gray-900"
              >
                <RotateCcw className="h-3 w-3" />
                {t("pg_clear")}
              </button>
            </div>
            <div
              ref={logRef}
              className="min-h-0 flex-1 overflow-auto px-5 pb-4 font-mono text-[13px] leading-[1.7]"
            >
              {entries.length === 0 ? (
                <p className="text-gray-400">
                  {t("pg_empty")}{" "}
                  <span className="text-gray-500">
                    {`print("hola mundo")`}
                  </span>
                </p>
              ) : (
                entries.map((entry, i) => (
                  <pre
                    key={i}
                    className={`whitespace-pre-wrap break-words ${
                      entry.type === "err"
                        ? "text-red-600"
                        : "text-gray-800"
                    }`}
                  >
                    {entry.text}
                  </pre>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}