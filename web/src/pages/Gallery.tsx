import { useMemo, useState } from 'react'
import { sampleResume } from '../lib/sample'
import { TEMPLATE_LIST } from '../templates'
import { loadTemplateId } from '../lib/storage'
import { TemplateThumb } from '../components/TemplateThumb'

interface GalleryProps {
  onSelect: (templateId: string) => void
  currentTemplateId: string
}

export function GalleryPage({ onSelect, currentTemplateId }: GalleryProps) {
  const [query, setQuery] = useState('')
  // Only show "Continue editing" for returning users who explicitly picked a template
  const hasPickedTemplate = useMemo(() => Boolean(loadTemplateId()), [])
  const thumbResume = useMemo(() => sampleResume(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return TEMPLATE_LIST
    return TEMPLATE_LIST.filter((t) => {
      const haystack = [t.meta.name, t.meta.vibe, ...t.meta.tags].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-neutral-100">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-[#0b0b0e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3">
          <span className="text-[15px] font-extrabold tracking-tight">
            CVMaker<span className="text-blue-400">.</span>
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:inline">
            Form → CV website
          </span>
          {hasPickedTemplate && currentTemplateId && (
            <button
              onClick={() => onSelect(currentTemplateId)}
              className="ml-auto rounded-lg border border-blue-500/50 bg-blue-500/10 px-3 py-1.5 text-[12px] font-semibold text-blue-300 hover:bg-blue-500/20"
            >
              Continue editing →{' '}
              {TEMPLATE_LIST.find((t) => t.meta.id === currentTemplateId)?.meta.name}
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-4 pb-2 pt-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pick a template to start your CV
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-[14px] text-neutral-400">
          Choose a design, then make it yours — edit every field, save, download as PDF or share a
          live link. Just like Canva.
        </p>

        {/* Search */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search templates"
              placeholder="Search templates — e.g. clean, purple, bold…"
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-2.5 pl-10 pr-4 text-[13.5px] text-neutral-100 placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </section>

      {/* Template grid */}
      <main className="mx-auto max-w-[1400px] px-4 py-6">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-neutral-500">
            No templates match “{query}”.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((t) => {
              const active = currentTemplateId === t.meta.id
              return (
                <button
                  key={t.meta.id}
                  type="button"
                  onClick={() => onSelect(t.meta.id)}
                  aria-label={`Use the ${t.meta.name} template`}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 text-left transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:shadow-xl hover:shadow-black/40 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <div className="pointer-events-none p-2.5">
                    <TemplateThumb def={t} resume={thumbResume} />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[14px] font-semibold text-neutral-100">
                        {t.meta.name}
                      </span>
                      {active && (
                        <span className="shrink-0 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[12px] text-neutral-500">{t.meta.vibe}</p>
                    <span
                      className={`mt-3 w-full rounded-lg py-2 text-center text-[13px] font-bold transition-colors ${
                        active
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-blue-500 text-white group-hover:bg-blue-400'
                      }`}
                    >
                      {active ? 'Edit this CV' : 'Use this template'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
