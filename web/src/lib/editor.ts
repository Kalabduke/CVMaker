import { createContext, useContext } from 'react'
import type { ResumeSchema } from '../types/resume'

/**
 * Editor context — when present (the canvas editor), templates render their
 * text through <EditableText> as click-to-edit contentEditable nodes. When
 * absent (gallery thumbnails, share pages, PDF capture) they render as plain,
 * read-only text — identical to before.
 */
export interface EditorApi {
  editable: boolean
  updateField: (path: string, value: string) => void
}

export const EditorContext = createContext<EditorApi>({
  editable: false,
  updateField: () => {},
})

export const useEditor = () => useContext(EditorContext)

/**
 * Update a resume field addressed by a dotted path:
 *   summary
 *   contact.email
 *   experience.<id>.role
 *   experience.<id>.bullets.<index>
 *   skills.<id>.name
 *   projects.<id>.tech
 *   custom.<id>.items.<index>
 * Array-typed scalar fields (projects.tech) split on ',' or '·'.
 */
export function updateResumeField(
  resume: ResumeSchema,
  path: string,
  value: string,
): ResumeSchema {
  const seg = path.split('.')

  if (seg.length === 1 && seg[0] === 'summary') {
    return { ...resume, summary: value }
  }

  if (seg[0] === 'contact') {
    return { ...resume, contact: { ...resume.contact, [seg[1]]: value } }
  }

  const arr = seg[0] as keyof ResumeSchema
  const list = resume[arr]
  if (!Array.isArray(list)) return resume
  const id = seg[1]
  const field = seg[2]
  const rest = seg.slice(3)

  return {
    ...resume,
    [arr]: list.map((item) => {
      const entry = item as unknown as Record<string, unknown> & { id: string }
      if (entry.id !== id) return item

      if (rest.length === 0) {
        if (field === 'tech') {
          const tech = value
            .split(/[,·]/)
            .map((t) => t.trim())
            .filter(Boolean)
          return { ...entry, tech }
        }
        if (field === 'location') {
          // Strip a leading separator a user may have typed after the company
          return { ...entry, location: value.replace(/^[\s·,]+/, '') }
        }
        if (field === 'endDate') {
          // Typing "Present" marks the role as current, matching the panel checkbox;
          // typing any real date (or clearing) flips it back to current: false.
          if (value.trim().toLowerCase() === 'present') {
            return { ...entry, endDate: '', current: true }
          }
          return { ...entry, endDate: value.trim(), current: false }
        }
        return { ...entry, [field]: value }
      }

      // Nested array field, e.g. bullets.0 or items.1
      const nested = Array.isArray(entry[field]) ? [...(entry[field] as string[])] : []
      nested[Number(rest[0])] = value
      return { ...entry, [field]: nested }
    }),
  }
}
