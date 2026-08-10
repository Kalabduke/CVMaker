import type { ResumeSchema } from '../types/resume'

const KEY = 'cvmaker:resume:v1'
const SLUG_KEY = 'cvmaker:slug:v1'
const TEMPLATE_KEY = 'cvmaker:template:v1'
const ACCENT_KEY = 'cvmaker:accent:v1'

export function loadResume(): ResumeSchema | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ResumeSchema) : null
  } catch {
    return null
  }
}

export function saveResume(resume: ResumeSchema): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(resume))
  } catch {
    // storage full or unavailable — non-fatal
  }
}

export function loadSlug(): string {
  return localStorage.getItem(SLUG_KEY) ?? ''
}

export function saveSlug(slug: string): void {
  localStorage.setItem(SLUG_KEY, slug)
}

export function loadTemplateId(): string {
  return localStorage.getItem(TEMPLATE_KEY) ?? ''
}

export function saveTemplateId(id: string): void {
  localStorage.setItem(TEMPLATE_KEY, id)
}

export function loadAccent(): string {
  return localStorage.getItem(ACCENT_KEY) ?? ''
}

export function saveAccent(accent: string): void {
  localStorage.setItem(ACCENT_KEY, accent)
}

export function exportResumeJson(resume: ResumeSchema): void {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cvmaker-resume.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function importResumeJson(file: File): Promise<ResumeSchema> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(JSON.parse(String(reader.result)) as ResumeSchema)
      } catch (e) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsText(file)
  })
}
