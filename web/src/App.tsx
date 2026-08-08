import { useEffect, useMemo, useState } from 'react'
import type { ResumeSchema } from './types/resume'
import { emptyResume } from './types/resume'
import { Form } from './components/Form'
import { getTemplate, TEMPLATE_LIST } from './templates'
import { exportResumeJson, importResumeJson, loadResume, saveResume, loadSlug, saveSlug } from './lib/storage'
import { saveResumeToBackend } from './lib/backend'
import { firebaseReady } from './lib/firebaseConfig'
import { SharePage } from './pages/Share'

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${base || 'cv'}-${Math.random().toString(36).slice(2, 6)}`
}

export default function App() {
  // Share route: /r/:slug renders the stored resume only.
  const shareMatch = useMemo(() => window.location.pathname.match(/^\/r\/([^/]+)\/?$/), [])
  if (shareMatch) return <SharePage slug={decodeURIComponent(shareMatch[1])} />

  const [resume, setResume] = useState<ResumeSchema>(() => loadResume() ?? emptyResume())
  const [templateId, setTemplateId] = useState('modern')
  const [accent, setAccent] = useState('#2563eb')
  const [slug, setSlug] = useState(() => loadSlug())
  const [toast, setToast] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => saveResume(resume), 400)
    return () => clearTimeout(t)
  }, [resume])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const template = useMemo(() => getTemplate(templateId), [templateId])
  const TemplateComponent = template.Component

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
      await downloadResumePdf(resume, accent)
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

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-neutral-100">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-20 border-b border-neutral-800 bg-[#0b0b0e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3">
          <span className="text-[15px] font-extrabold tracking-tight">
            CVMaker<span className="text-blue-400">.</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Form → CV website
          </span>

          <div className="ml-auto flex flex-wrap items-center gap-2">
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
      </header>

      {/* Template picker */}
      <div className="no-print mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 pt-4">
        <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-neutral-500">Template</span>
        {TEMPLATE_LIST.map((t) => (
          <button
            key={t.meta.id}
            className={`rounded-lg border px-3 py-1.5 text-[12px] ${
              templateId === t.meta.id
                ? 'border-blue-400 bg-blue-500/20 text-blue-200'
                : 'border-neutral-700 text-neutral-300 hover:border-neutral-500'
            }`}
            onClick={() => {
              setTemplateId(t.meta.id)
              setAccent(t.meta.defaultAccent)
            }}
          >
            {t.meta.name}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-[12px] text-neutral-400">
          Accent
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="h-7 w-9 cursor-pointer rounded border border-neutral-700 bg-transparent"
          />
        </label>
        {firebaseReady ? (
          <span className="ml-2 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] text-emerald-300">
            ● Cloud saves on
          </span>
        ) : (
          <span className="ml-2 rounded-full bg-neutral-800 px-2.5 py-1 text-[11px] text-neutral-500" title="Add web/.env with Firebase keys to enable cloud saves">
            Cloud saves off
          </span>
        )}
      </div>

      {/* Two-pane editor */}
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-5 lg:grid-cols-[420px_1fr]">
        {/* Form */}
        <div className="no-print max-h-[calc(100vh-150px)] overflow-y-auto pr-1">
          <Form resume={resume} onChange={setResume} />
        </div>

        {/* Live preview (A4 paper) */}
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
