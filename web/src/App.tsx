import { useEffect, useMemo, useState } from 'react'
import type { ResumeSchema } from './types/resume'
import { sampleResume } from './lib/sample'
import { Form } from './components/Form'
import { getTemplate } from './templates'
import { exportResumeJson, importResumeJson, loadResume, saveResume, loadSlug, saveSlug, loadTemplateId, saveTemplateId, loadAccent, saveAccent } from './lib/storage'
import { saveResumeToBackend } from './lib/backend'
import { firebaseReady } from './lib/firebaseConfig'
import { SharePage } from './pages/Share'
import { GalleryPage } from './pages/Gallery'

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${base || 'cv'}-${Math.random().toString(36).slice(2, 6)}`
}

/** Read the view from the URL hash. '#/edit' → editor, anything else → gallery. */
function readView(): 'gallery' | 'editor' {
  return window.location.hash.startsWith('#/edit') ? 'editor' : 'gallery'
}

export default function App() {
  // Share route: /r/:slug renders the stored resume only.
  const shareMatch = useMemo(() => window.location.pathname.match(/^\/r\/([^/]+)\/?$/), [])
  if (shareMatch) return <SharePage slug={decodeURIComponent(shareMatch[1])} />

  const [view, setView] = useState<'gallery' | 'editor'>(readView)
  const [resume, setResume] = useState<ResumeSchema>(() => loadResume() ?? sampleResume())
  const [templateId, setTemplateId] = useState(() => {
    const saved = loadTemplateId()
    // Ignore a stale saved id that no longer exists in the template registry
    return saved && getTemplate(saved).meta.id === saved ? saved : getTemplate('modern').meta.id
  })
  const [accent, setAccent] = useState(() => {
    const saved = loadAccent()
    return saved || getTemplate(templateId || 'modern').meta.defaultAccent
  })
  const [slug, setSlug] = useState(() => loadSlug())
  const [toast, setToast] = useState('')
  const [downloading, setDownloading] = useState(false)

  // Keep view in sync with the hash (back/forward buttons + refresh persistence)
  useEffect(() => {
    const onHash = () => {
      setView(readView())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => saveResume(resume), 400)
    return () => clearTimeout(t)
  }, [resume])

  useEffect(() => {
    saveTemplateId(templateId)
  }, [templateId])

  useEffect(() => {
    saveAccent(accent)
  }, [accent])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const template = useMemo(() => getTemplate(templateId), [templateId])
  const TemplateComponent = template.Component

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id)
    // Only reset the accent when switching to a *different* template, so a
    // user's custom accent survives "Continue editing" on the same design.
    if (id !== templateId) setAccent(getTemplate(id).meta.defaultAccent)
    window.location.hash = '#/edit'
  }

  const handleShare = async () => {
    const nextSlug = slug || slugify(resume.contact.fullName || 'cv')
    saveSlug(nextSlug)
    setSlug(nextSlug)
    try {
      await saveResumeToBackend(resume, nextSlug)
    } catch {
      // backend unavailable — localStorage fallback already applied
    }
    const url = `${window.location.origin}/r/${nextSlug}`
    navigator.clipboard?.writeText(url).catch(() => {})
    setToast(`Share link: ${url}`)
  }

  const handleDownloadPdf = async () => {
    setDownloading(true)
    try {
      // Lazy-load react-pdf so the editor bundle stays small
      const { downloadResumePdf } = await import('./lib/pdf')
      await downloadResumePdf(resume, accent, templateId)
    } finally {
      setDownloading(false)
    }
  }

  const handleImportJson = async (file: File) => {
    try {
      const imported = await importResumeJson(file)
      setResume(imported)
      setToast('Resume imported')
    } catch (e) {
      setToast((e as Error).message)
    }
  }

  /* ---------------- Template gallery page ---------------- */
  if (view === 'gallery') {
    return <GalleryPage onSelect={handleSelectTemplate} currentTemplateId={templateId} />
  }

  /* ---------------- Editor page (Canva-style) ---------------- */
  return (
    <div className="min-h-screen bg-[#0b0b0e] text-neutral-100">
      {/* Canva-style top toolbar */}
      <header className="no-print sticky top-0 z-20 border-b border-neutral-800 bg-[#0b0b0e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-2.5">
          <button
            onClick={() => (window.location.hash = '#/')}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
            title="Back to templates"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Templates
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[15px] font-extrabold tracking-tight">
              CVMaker<span className="text-blue-400">.</span>
            </span>
            <span className="hidden items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {template.meta.name} · auto-saved
            </span>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              onClick={() => (window.location.hash = '#/')}
              className="rounded-lg border border-neutral-700 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-neutral-500"
              title="Switch to a different design"
            >
              Change template
            </button>
            <label className="rounded-lg border border-neutral-700 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-neutral-500">
              Import JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleImportJson(f)
                }}
              />
            </label>
            <button
              className="rounded-lg border border-neutral-700 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-neutral-500"
              onClick={() => exportResumeJson(resume)}
            >
              Export JSON
            </button>
            <button
              className="rounded-lg border border-neutral-700 px-3 py-1.5 text-[12px] text-neutral-300 hover:border-neutral-500"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="rounded-lg bg-blue-500 px-4 py-1.5 text-[12px] font-bold text-white hover:bg-blue-400 disabled:opacity-50"
              onClick={handleDownloadPdf}
              disabled={downloading}
            >
              {downloading ? 'Building PDF…' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Secondary row: accent + cloud status */}
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 border-t border-neutral-800/70 px-4 py-2">
          <label className="flex items-center gap-2 text-[12px] text-neutral-400">
            Accent
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="h-6 w-8 cursor-pointer rounded border border-neutral-700 bg-transparent"
            />
          </label>
          {firebaseReady ? (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] text-emerald-300">
              ● Cloud saves on
            </span>
          ) : (
            <span
              className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-[11px] text-neutral-500"
              title="Add web/.env with Firebase keys to enable cloud saves"
            >
              Cloud saves off
            </span>
          )}
        </div>
      </header>

      {/* Two-pane editor: form left, live preview center */}
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-5 lg:grid-cols-[420px_1fr]">
        <div className="no-print max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
          <Form resume={resume} onChange={setResume} />
        </div>

        <div className="resume-paper mx-auto w-full max-w-[820px] overflow-hidden rounded-md shadow-2xl shadow-black/50 ring-1 ring-neutral-800">
          <TemplateComponent resume={resume} accent={accent} />
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-neutral-800 px-5 py-2 text-[13px] text-neutral-100 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}
