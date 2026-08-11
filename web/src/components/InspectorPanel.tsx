import { useState } from 'react'
import type { ResumeSchema } from '../types/resume'
import { uid } from '../types/resume'
import { PhotoUpload } from './PhotoUpload'

interface Props {
  resume: ResumeSchema
  onChange: (next: ResumeSchema) => void
  accent: string
  onAccent: (c: string) => void
}

function Section({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="border-t border-neutral-800 p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  )
}

function IconBtn({
  onClick,
  title,
  children,
  danger,
  disabled,
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
  danger?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-1.5 py-0.5 text-[12px] leading-none ${
        disabled
          ? 'cursor-not-allowed opacity-30'
          : danger
            ? 'text-neutral-500 hover:bg-red-500/15 hover:text-red-300'
            : 'text-neutral-500 hover:bg-neutral-700 hover:text-neutral-200'
      }`}
    >
      {children}
    </button>
  )
}

function EntryRow({
  label,
  onUp,
  onDown,
  onRemove,
  canUp,
  canDown,
}: {
  label: string
  onUp: () => void
  onDown: () => void
  onRemove: () => void
  canUp: boolean
  canDown: boolean
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/60 px-2 py-1.5">
      <span className="min-w-0 flex-1 truncate text-[12px] text-neutral-300">{label || 'Untitled'}</span>
      <IconBtn onClick={onUp} title="Move up" disabled={!canUp}>
        ↑
      </IconBtn>
      <IconBtn onClick={onDown} title="Move down" disabled={!canDown}>
        ↓
      </IconBtn>
      <IconBtn onClick={onRemove} title="Remove" danger>
        ✕
      </IconBtn>
    </div>
  )
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-dashed border-neutral-600 px-3 py-1.5 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
    >
      + {label}
    </button>
  )
}

const move = <T,>(arr: T[], i: number, dir: -1 | 1): T[] => {
  const j = i + dir
  if (j < 0 || j >= arr.length) return arr
  const next = [...arr]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

export function InspectorPanel({ resume, onChange, accent, onAccent }: Props) {
  const [skillInput, setSkillInput] = useState('')
  const [langInput, setLangInput] = useState('')

  return (
    <aside className="no-print w-full overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/40 lg:max-h-[calc(100vh-150px)]">
      <div className="border-b border-neutral-800 p-4">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-neutral-300">
          Properties
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
          Click any text on the CV to edit it — add, remove and reorder sections here.
        </p>
      </div>

      <Section title="Appearance">
        <label className="flex items-center gap-2 text-[12px] text-neutral-400">
          Accent color
          <input
            type="color"
            value={accent}
            onChange={(e) => onAccent(e.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent"
          />
        </label>
        <PhotoUpload
          value={resume.contact.photoUrl}
          onChange={(v) =>
            onChange({ ...resume, contact: { ...resume.contact, photoUrl: v } })
          }
        />
      </Section>

      <Section title="Experience">
        {resume.experience.map((e, i) => (
          <div key={e.id} className="space-y-1">
            <EntryRow
              label={`${e.role}${e.company ? ` — ${e.company}` : ''}`}
              canUp={i > 0}
              canDown={i < resume.experience.length - 1}
              onUp={() =>
                onChange({
                  ...resume,
                  experience: move(resume.experience, i, -1),
                })
              }
              onDown={() =>
                onChange({
                  ...resume,
                  experience: move(resume.experience, i, 1),
                })
              }
              onRemove={() =>
                onChange({
                  ...resume,
                  experience: resume.experience.filter((x) => x.id !== e.id),
                })
              }
            />
            <label className="flex items-center gap-1.5 pl-1 text-[11px] text-neutral-500">
              <input
                type="checkbox"
                checked={e.current}
                onChange={(ev) =>
                  onChange({
                    ...resume,
                    experience: resume.experience.map((x) =>
                      x.id === e.id ? { ...x, current: ev.target.checked } : x,
                    ),
                  })
                }
                className="accent-blue-500"
              />
              Currently working here
            </label>
          </div>
        ))}
        <AddBtn
          label="Add experience"
          onClick={() =>
            onChange({
              ...resume,
              experience: [
                ...resume.experience,
                {
                  id: uid(),
                  role: '',
                  company: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  bullets: [],
                },
              ],
            })
          }
        />
      </Section>

      <Section title="Education">
        {resume.education.map((e, i) => (
          <EntryRow
            key={e.id}
            label={`${e.degree}${e.school ? ` — ${e.school}` : ''}`}
            canUp={i > 0}
            canDown={i < resume.education.length - 1}
            onUp={() =>
              onChange({
                ...resume,
                education: move(resume.education, i, -1),
              })
            }
            onDown={() =>
              onChange({
                ...resume,
                education: move(resume.education, i, 1),
              })
            }
            onRemove={() =>
              onChange({
                ...resume,
                education: resume.education.filter((x) => x.id !== e.id),
              })
            }
          />
        ))}
        <AddBtn
          label="Add education"
          onClick={() =>
            onChange({
              ...resume,
              education: [
                ...resume.education,
                {
                  id: uid(),
                  degree: '',
                  school: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  details: '',
                },
              ],
            })
          }
        />
      </Section>

      <Section title="Projects">
        {resume.projects.map((p, i) => (
          <EntryRow
            key={p.id}
            label={p.name}
            canUp={i > 0}
            canDown={i < resume.projects.length - 1}
            onUp={() =>
              onChange({ ...resume, projects: move(resume.projects, i, -1) })
            }
            onDown={() =>
              onChange({ ...resume, projects: move(resume.projects, i, 1) })
            }
            onRemove={() =>
              onChange({
                ...resume,
                projects: resume.projects.filter((x) => x.id !== p.id),
              })
            }
          />
        ))}
        <AddBtn
          label="Add project"
          onClick={() =>
            onChange({
              ...resume,
              projects: [
                ...resume.projects,
                { id: uid(), name: '', description: '', link: '', tech: [] },
              ],
            })
          }
        />
      </Section>

      <Section title="Custom sections">
        {resume.custom.map((s, i) => (
          <EntryRow
            key={s.id}
            label={s.title || 'Untitled section'}
            canUp={i > 0}
            canDown={i < resume.custom.length - 1}
            onUp={() => onChange({ ...resume, custom: move(resume.custom, i, -1) })}
            onDown={() => onChange({ ...resume, custom: move(resume.custom, i, 1) })}
            onRemove={() =>
              onChange({
                ...resume,
                custom: resume.custom.filter((x) => x.id !== s.id),
              })
            }
          />
        ))}
        <AddBtn
          label="Add section"
          onClick={() =>
            onChange({
              ...resume,
              custom: [...resume.custom, { id: uid(), title: '', items: [] }],
            })
          }
        />
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {resume.skills.map((s) => (
            <span
              key={s.id}
              className="flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[12px] text-neutral-200"
            >
              {s.name || 'Skill'}
              <span className="flex gap-px">
                {[1, 2, 3, 4, 5].map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    title={`Level ${lv}`}
                    onClick={() =>
                      onChange({
                        ...resume,
                        skills: resume.skills.map((x) =>
                          x.id === s.id ? { ...x, level: lv } : x,
                        ),
                      })
                    }
                    className="px-0.5 text-[8px] leading-none"
                    style={{ color: lv <= s.level ? accent : '#52525b' }}
                  >
                    ●
                  </button>
                ))}
              </span>
              <IconBtn
                onClick={() =>
                  onChange({
                    ...resume,
                    skills: resume.skills.filter((x) => x.id !== s.id),
                  })
                }
                title="Remove skill"
                danger
              >
                ✕
              </IconBtn>
            </span>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && skillInput.trim()) {
                onChange({
                  ...resume,
                  skills: [...resume.skills, { id: uid(), name: skillInput.trim(), level: 3 }],
                })
                setSkillInput('')
              }
            }}
            placeholder="Type a skill, press Enter"
            className="min-w-0 flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-[12px] text-neutral-100 placeholder-neutral-500 outline-none focus:border-neutral-500"
          />
        </div>
      </Section>

      <Section title="Languages">
        <div className="flex flex-wrap gap-1.5">
          {resume.languages.map((l) => (
            <span
              key={l.id}
              className="flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[12px] text-neutral-200"
            >
              {l.name || 'Language'}
              <span className="text-neutral-500">· {l.proficiency || 'Fluent'}</span>
              <IconBtn
                onClick={() =>
                  onChange({
                    ...resume,
                    languages: resume.languages.filter((x) => x.id !== l.id),
                  })
                }
                title="Remove language"
                danger
              >
                ✕
              </IconBtn>
            </span>
          ))}
        </div>
        <input
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && langInput.trim()) {
              const [name, ...rest] = langInput.trim().split('·')
              onChange({
                ...resume,
                languages: [
                  ...resume.languages,
                  {
                    id: uid(),
                    name: name.trim(),
                    proficiency: rest.join('·').trim() || 'Fluent',
                  },
                ],
              })
              setLangInput('')
            }
          }}
          placeholder="e.g. Amharic · Native"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-[12px] text-neutral-100 placeholder-neutral-500 outline-none focus:border-neutral-500"
        />
      </Section>
    </aside>
  )
}
