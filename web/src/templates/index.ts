import type { ComponentType } from 'react'
import type { ResumeSchema } from '../types/resume'
import { ModernTemplate } from './Modern'
import { MinimalTemplate } from './Minimal'
import { ExecutiveTemplate } from './Executive'
import { AccountingTemplate } from './Accounting'
import { BlueGrayTemplate } from './BlueGray'
import { PurpleTemplate } from './Purple'
import { OrangeTemplate } from './Orange'
import { PinkTemplate } from './Pink'
import { MonochromeTemplate } from './Monochrome'
import { GreyWhiteTemplate } from './GreyWhite'

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
  executive: {
    meta: {
      id: 'executive',
      name: 'Executive',
      vibe: 'Two-column with light-gray side rail',
      tags: ['corporate', 'gray'],
      defaultAccent: '#52525b',
    },
    Component: ExecutiveTemplate,
  },
  accounting: {
    meta: {
      id: 'accounting',
      name: 'Accounting',
      vibe: 'Summary-led two-column layout',
      tags: ['finance', 'clean'],
      defaultAccent: '#1f2937',
    },
    Component: AccountingTemplate,
  },
  bluegray: {
    meta: {
      id: 'bluegray',
      name: 'Blue & Gray',
      vibe: 'Centered header with side rail',
      tags: ['classic', 'blue'],
      defaultAccent: '#1d4ed8',
    },
    Component: BlueGrayTemplate,
  },
  purple: {
    meta: {
      id: 'purple',
      name: 'Purple & White',
      vibe: 'Single column with centered header',
      tags: ['elegant', 'purple'],
      defaultAccent: '#7c3aed',
    },
    Component: PurpleTemplate,
  },
  orange: {
    meta: {
      id: 'orange',
      name: 'Dark Orange',
      vibe: 'Bold single column with orange rules',
      tags: ['bold', 'sales'],
      defaultAccent: '#c2410c',
    },
    Component: OrangeTemplate,
  },
  pink: {
    meta: {
      id: 'pink',
      name: 'Pink & White',
      vibe: 'Soft pink sidebar with bold header',
      tags: ['designer', 'pink'],
      defaultAccent: '#db2777',
    },
    Component: PinkTemplate,
  },
  monochrome: {
    meta: {
      id: 'monochrome',
      name: 'Black & White',
      vibe: 'Monochrome two-column with labels',
      tags: ['minimalist', 'bw'],
      defaultAccent: '#111111',
    },
    Component: MonochromeTemplate,
  },
  greywhite: {
    meta: {
      id: 'greywhite',
      name: 'Grey & White',
      vibe: 'Gray sidebar with underlined section rules',
      tags: ['clean', 'gray'],
      defaultAccent: '#475569',
    },
    Component: GreyWhiteTemplate,
  },
}

export const TEMPLATE_LIST: TemplateDefinition[] = Object.values(TEMPLATES)

export const getTemplate = (id: string): TemplateDefinition =>
  TEMPLATES[id] ?? TEMPLATES.minimal
