import type { ComponentType } from 'react'
import type { ResumeSchema } from '../types/resume'
import { ModernTemplate } from './Modern'
import { MinimalTemplate } from './Minimal'

export interface TemplateMeta {
  id: string
  name: string
  vibe: string
  tags: string[]
  defaultAccent: string
}

export interface TemplateDefinition {
  meta: TemplateMeta
  Component: ComponentType<{ resume: ResumeSchema; accent: string }>
}

export const TEMPLATES: Record<string, TemplateDefinition> = {
  modern: {
    meta: {
      id: 'modern',
      name: 'Modern',
      vibe: 'Two-column with accent sidebar',
      tags: ['clean', 'ats-friendly'],
      defaultAccent: '#2563eb',
    },
    Component: ModernTemplate,
  },
  minimal: {
    meta: {
      id: 'minimal',
      name: 'Minimal',
      vibe: 'Single column, lots of whitespace',
      tags: ['classic', 'print-friendly'],
      defaultAccent: '#111111',
    },
    Component: MinimalTemplate,
  },
}

export const TEMPLATE_LIST: TemplateDefinition[] = Object.values(TEMPLATES)

export const getTemplate = (id: string): TemplateDefinition =>
  TEMPLATES[id] ?? TEMPLATES.minimal
