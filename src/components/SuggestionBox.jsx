import { useState } from "react"
import { CheckCircle2, Loader2, MessageSquareText, Send } from "lucide-react"

import { SUGGESTION_ENDPOINT, WEB3FORMS_ACCESS_KEY } from "../config"
import Reveal from "./Reveal"
import { useI18n } from "../i18n/useI18n"

export default function SuggestionBox({ pageTitle = "" }) {
  const { t } = useI18n()
  const [message, setMessage] = useState("")
  const [contact, setContact] = useState("")
  const [status, setStatus] = useState("idle")

  const submit = async (e) => {
    e.preventDefault()
    const page = pageTitle || "—"
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("unconfigured")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(SUGGESTION_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          message,
          name: contact,
          page,
          website: typeof location !== "undefined" ? location.href : "",
          _subject: t("sb_subject", { page }),
          _replyto: contact.includes("@") ? contact : "",
          botcheck: "",
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error("submit failed")
      setMessage("")
      setContact("")
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Reveal>
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-4 sm:pb-20">
        <div className="rounded-3xl border border-line bg-surface/50 p-6 sm:p-8">
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-apple to-apple-2 text-apple-contrast shadow-apple-soft">
              <MessageSquareText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-[20px] font-bold tracking-tight text-ink">
                {t("sb_title")}
              </h2>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                {t("sb_desc")}
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink">
                {t("sb_message_label")}
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder={t("sb_message_placeholder")}
                className="w-full resize-y rounded-2xl border border-line bg-canvas px-4 py-3 text-[14px] leading-relaxed text-ink placeholder:text-ink-faint transition-colors focus:border-linestrong focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink">
                {t("sb_contact_label")}
              </span>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                placeholder={t("sb_contact_placeholder")}
                className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-[14px] text-ink placeholder:text-ink-faint transition-colors focus:border-linestrong focus:outline-none"
              />
            </label>

            <div className="flex items-center justify-between gap-4">
              <p className="hidden text-[12.5px] text-ink-faint sm:block">
                {t("sb_privacy_note")}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-apple px-6 text-[14.5px] font-medium text-apple-contrast shadow-apple-lift transition-all hover:bg-apple-deep disabled:opacity-60"
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {t("sb_send")}
              </button>
            </div>

            {status === "sent" && (
              <p className="flex items-center gap-2 text-[13.5px] font-medium text-[#1a7f37] dark:text-[#3fb950]">
                <CheckCircle2 className="h-4 w-4" />
                {t("sb_sent")}
              </p>
            )}
            {status === "unconfigured" && (
              <p className="text-[13.5px] font-medium text-[#9c7400] dark:text-[#febc2e]">
                {t("sb_unconfigured")}
              </p>
            )}
            {status === "error" && (
              <p className="text-[13.5px] font-medium text-[#b4231c] dark:text-[#ff9d9d]">
                {t("sb_error")}
              </p>
            )}
          </form>
        </div>
      </section>
    </Reveal>
  )
}