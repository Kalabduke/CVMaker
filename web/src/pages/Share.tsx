import { useEffect, useState } from 'react'
import type { ResumeSchema } from '../types/resume'
import { loadResumeBySlug } from '../lib/backend'
import { getTemplate } from '../templates'

export function SharePage({ slug }: { slug: string }) {
  const [resume, setResume] = useState<ResumeSchema | null | 'loading'>('loading')

  useEffect(() => {
    let cancelled = false
    loadResumeBySlug(slug).then((data) => {
      if (!cancelled) setResume(data ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (resume === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0b0e] text-neutral-300">
        Loading resume…
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0b0b0e] text-neutral-300">
        <p className="text-xl font-bold">Resume not found</p>
        <p className="text-sm text-neutral-500">This link may be wrong or expired.</p>
        <a href="/" className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-400">
          Build your own CV
        </a>
      </div>
    )
  }

  const template = getTemplate('modern')
  const TemplateComponent = template.Component

  return (
    <div className="min-h-screen bg-[#0b0b0e] py-8">
      <div className="mx-auto max-w-[820px]">
        <div className="resume-paper overflow-hidden rounded-md shadow-2xl shadow-black/50 ring-1 ring-neutral-800">
          <TemplateComponent resume={resume} accent={template.meta.defaultAccent} />
        </div>
        <p className="mt-4 text-center text-xs text-neutral-600">
          Made with CVMaker —{' '}
          <a href="/" className="text-blue-400 hover:underline">
            build your own CV website
          </a>
        </p>
      </div>
    </div>
  )
}
