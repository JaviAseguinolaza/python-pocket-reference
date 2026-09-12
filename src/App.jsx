import { useCallback, useEffect, useState } from "react"
import { X } from "lucide-react"

import { useHash } from "./hooks/useHash"
import { useTheme } from "./hooks/useTheme"
import { useAccent } from "./hooks/useAccent"
import { useProgress } from "./hooks/useProgress"
import { findTopic, getCategory } from "./data/manual"
import { PlaygroundProvider } from "./context/PlaygroundProvider"
import { usePlayground } from "./context/usePlayground"
import { I18nProvider } from "./i18n/I18nContext"
import { useI18n } from "./i18n/useI18n"

import TopBar from "./components/TopBar"
import Sidebar from "./components/Sidebar"
import RightIndex from "./components/RightIndex"
import SearchModal from "./components/SearchModal"
import ScrollProgress from "./components/ScrollProgress"
import BackToTop from "./components/BackToTop"

import Home from "./pages/Home"
import Ficha from "./pages/Ficha"

function AppShell() {
  const { hash, navigate } = useHash()
  const { theme, toggle } = useTheme()
  const { accent, change: changeAccent } = useAccent()
  const { t } = useI18n()
  const { openPlayground } = usePlayground()
  const { read, toggle: toggleRead } = useProgress()

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const found = findTopic(hash)
  const isFicha = Boolean(found)

  const topicKey = found
    ? `${found.category.id}/${found.topic.id}`
    : ""

  // Cambio de ruta: cierra el drawer móvil siempre
  const go = useCallback(
    (h) => {
      setMenuOpen(false)
      navigate(h)
    },
    [navigate],
  )

  const goToCategory = useCallback(
    (categoryId) => {
      const cat = getCategory(categoryId)
      if (cat?.topics?.[0]) go(`#/${cat.id}/${cat.topics[0].id}`)
    },
    [go],
  )

  const goToTopic = useCallback(
    (categoryId, topicId) => {
      go(`#/${categoryId}/${topicId}`)
    },
    [go],
  )

  // ⌘K / Ctrl+K abre el buscador
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const handleSelect = useCallback(
    (categoryId, topicId) => {
      goToTopic(categoryId, topicId)
      setSearchOpen(false)
    },
    [goToTopic],
  )

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <TopBar
        onSearch={() => setSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggle}
        onHome={() => go("#/")}
        showMenu={isFicha}
        onMenu={() => setMenuOpen(true)}
        accent={accent}
        onChangeAccent={changeAccent}
      />

      {isFicha ? (
        <div className="mx-auto flex max-w-[1180px] gap-10 px-5 pb-16 lg:px-8">
          {/* Sidebar escritorio */}
          <Sidebar
            categoryId={found.category.id}
            topicId={found.topic.id}
            onNavigate={go}
            read={read}
            className="sticky top-20 hidden h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto py-8 pr-2 lg:block"
          />

          <main className="min-w-0 flex-1 py-8">
            <Ficha
              category={found.category}
              topic={found.topic}
              onNavigate={go}
              isRead={read.has(topicKey)}
              onToggleRead={() => toggleRead(topicKey)}
            />
          </main>

          <aside className="hidden w-52 shrink-0 py-8 xl:block">
            <RightIndex topic={found.topic} />
          </aside>
        </div>
      ) : (
        <Home
          onSelectCategory={goToCategory}
          onSearch={() => setSearchOpen(true)}
          onPlayground={() => openPlayground("")}
        />
      )}

      {/* Drawer móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-fade-up flex-col bg-canvas shadow-apple-pop">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-[15px] font-semibold text-ink">
                {t("breadcrumb_manual")}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                aria-label={t("search_close")}
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-5">
              <Sidebar
                categoryId={found.category.id}
                topicId={found.topic.id}
                onNavigate={go}
                read={read}
              />
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <SearchModal
          key="search"
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelect={handleSelect}
        />
      )}

      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <PlaygroundProvider>
        <AppShell />
      </PlaygroundProvider>
    </I18nProvider>
  )
}