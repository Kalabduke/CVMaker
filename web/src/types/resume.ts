// ResumeSchema — the single source of truth for all resume data.
// Templates render this shape; the form writes into it; imports map into it.

export interface Contact {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  photoUrl: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface EducationItem {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  details: string
}

export interface SkillItem {
  id: string
  name: string
  level: number // 1-5
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  link: string
  tech: string[]
}

export interface LanguageItem {
  id: string
  name: string
  proficiency: string
}

export interface CustomItem {
  id: string
  title: string
  items: string[]
}

export interface ResumeSchema {
  contact: Contact
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillItem[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  custom: CustomItem[]
}

export const emptyResume = (): ResumeSchema => ({
  contact: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  custom: [],
})

export const uid = (): string =>
  Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4)
