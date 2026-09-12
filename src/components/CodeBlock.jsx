import { useMemo, useState } from "react"
import hljs from "highlight.js/lib/core"
import python from "highlight.js/lib/languages/python"
import { Check, Copy, Play } from "lucide-react"

import { usePlayground } from "../context/usePlayground"
import { useI18n } from "../i18n/useI18n"

hljs.registerLanguage("python", python)

const langName = () => {
  try {
    return hljs.getLanguage("python").name
  } catch {
    return "python"
  }
}

export default function CodeBlock({ code, title = "", run = true }) {
  const [copied, setCopied] = useState(false)
  const { openPlayground } = usePlayground()
  const { t } = useI18n()

  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code, { language: "python" }).value
    } catch {
      return code
    }
  }, [code])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* noop */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-codebg shadow-apple-soft ring-1 ring-black/10 dark:ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <p className="flex-1 truncate pl-2 font-mono text-[13px] text-white/60">
          {title || langName()}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t("code_copy_aria")}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#34d399]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? t("code_copied") : t("code_copy")}
          </button>
          {run && (
            <button
              onClick={() => openPlayground(code)}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-[13px] font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
              aria-label={t("code_run_aria")}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              {t("code_run")}
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <pre className="px-5 py-4 font-mono text-[13.5px] leading-[1.65] text-[#e6edf3]">
          <code
            className="font-mono text-[13.5px]"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  )
}