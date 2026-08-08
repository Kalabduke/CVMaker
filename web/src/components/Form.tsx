import type { ResumeSchema } from '../types/resume'
import { uid } from '../types/resume'

interface Props {
  resume: ResumeSchema
  onChange: (next: ResumeSchema) => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  textarea?: boolean
}) {
  const cls =
    'w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-[13px] text-neutral-100 placeholder-neutral-500 outline-none focus:border-neutral-500'
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] text-neutral-500">{label}</span>
      {textarea ? (
        <textarea className={`${cls} min-h-[80px] resize-y`} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

export function Form({ resume, onChange }: Props) {
  const setContact = (k: keyof ResumeSchema['contact'], v: string) =>
    onChange({ ...resume, contact: { ...resume.contact, [k]: v } })

  return (
    <div className="space-y-4">
      <Section title="Contact">
        <Field label="Full name" value={resume.contact.fullName} onChange={(v) => setContact('fullName', v)} placeholder="Jane Doe" />
        <Field label="Headline / title" value={resume.contact.headline} onChange={(v) => setContact('headline', v)} placeholder="Senior Software Engineer" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email" value={resume.contact.email} onChange={(v) => setContact('email', v)} placeholder="jane@email.com" />
          <Field label="Phone" value={resume.contact.phone} onChange={(v) => setContact('phone', v)} placeholder="+251 ..." />
        </div>
        <Field label="Location" value={resume.contact.location} onChange={(v) => setContact('location', v)} placeholder="Addis Ababa, Ethiopia" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="LinkedIn" value={resume.contact.linkedin} onChange={(v) => setContact('linkedin', v)} placeholder="linkedin.com/in/..." />
          <Field label="GitHub" value={resume.contact.github} onChange={(v) => setContact('github', v)} placeholder="github.com/..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Website" value={resume.contact.website} onChange={(v) => setContact('website', v)} placeholder="https://..." />
          <Field label="Photo URL" value={resume.contact.photoUrl} onChange={(v) => setContact('photoUrl', v)} placeholder="https://.../photo.jpg" />
        </div>
      </Section>

      <Section title="Summary">
        <Field textarea label="Short description about you" value={resume.summary} onChange={(v) => onChange({ ...resume, summary: v })} placeholder="I'm a developer who cares about the details..." />
      </Section>

      <Section title="Experience">
        {resume.experience.map((e, idx) => (
          <div key={e.id} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <div className="mb-2 flex justify-between text-[11px] text-neutral-500">
              <span>Entry {idx + 1}</span>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => onChange({ ...resume, experience: resume.experience.filter((x) => x.id !== e.id) })}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role" value={e.role} onChange={(v) => {
                const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, role: v } : x))
                onChange({ ...resume, experience })
              }} />
              <Field label="Company" value={e.company} onChange={(v) => {
                const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, company: v } : x))
                onChange({ ...resume, experience })
              }} />
            </div>
            <Field label="Location" value={e.location} onChange={(v) => {
              const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, location: v } : x))
              onChange({ ...resume, experience })
            }} placeholder="Addis Ababa, Ethiopia" />
            <div className="grid grid-cols-3 gap-3">
              <Field label="Start" value={e.startDate} onChange={(v) => {
                const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, startDate: v } : x))
                onChange({ ...resume, experience })
              }} placeholder="2023" />
              <Field label="End" value={e.endDate} onChange={(v) => {
                const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, endDate: v } : x))
                onChange({ ...resume, experience })
              }} placeholder="2025" />
              <label className="flex items-end gap-2 pb-2 text-[11px] text-neutral-400">
                <input
                  type="checkbox"
                  checked={e.current}
                  onChange={(ev) => {
                    const experience = resume.experience.map((x) => (x.id === e.id ? { ...x, current: ev.target.checked } : x))
                    onChange({ ...resume, experience })
                  }}
                />
                Current
              </label>
            </div>
            <Field textarea label="Bullets (one per line)" value={e.bullets.join('\n')} onChange={(v) => {
              const experience = resume.experience.map((x) =>
                x.id === e.id ? { ...x, bullets: v.split('\n').filter(Boolean) } : x,
              )
              onChange({ ...resume, experience })
            }} />
          </div>
        ))}
        <button
          className="rounded-lg border border-dashed border-neutral-600 px-3 py-2 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={() => onChange({ ...resume, experience: [...resume.experience, { id: uid(), role: '', company: '', location: '', startDate: '', endDate: '', current: false, bullets: [] }] })}
        >
          + Add experience
        </button>
      </Section>

      <Section title="Education">
        {resume.education.map((e, idx) => (
          <div key={e.id} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <div className="mb-2 flex justify-between text-[11px] text-neutral-500">
              <span>Entry {idx + 1}</span>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => onChange({ ...resume, education: resume.education.filter((x) => x.id !== e.id) })}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Degree" value={e.degree} onChange={(v) => {
                onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, degree: v } : x)) })
              }} />
              <Field label="School" value={e.school} onChange={(v) => {
                onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, school: v } : x)) })
              }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start" value={e.startDate} onChange={(v) => {
                onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, startDate: v } : x)) })
              }} />
              <Field label="End" value={e.endDate} onChange={(v) => {
                onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, endDate: v } : x)) })
              }} />
            </div>
            <Field label="Location" value={e.location} onChange={(v) => {
              onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, location: v } : x)) })
            }} placeholder="Addis Ababa, Ethiopia" />
            <Field textarea label="Details (one per line — GPA, awards, exams)" value={e.details} onChange={(v) => {
              onChange({ ...resume, education: resume.education.map((x) => (x.id === e.id ? { ...x, details: v } : x)) })
            }} placeholder={'CGPA - 3.02\nExit exam - 80/100'} />
          </div>
        ))}
        <button
          className="rounded-lg border border-dashed border-neutral-600 px-3 py-2 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={() => onChange({ ...resume, education: [...resume.education, { id: uid(), degree: '', school: '', location: '', startDate: '', endDate: '', details: '' }] })}
        >
          + Add education
        </button>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((s) => (
            <span key={s.id} className="flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-[12px]">
              {s.name}
              <button
                className="text-neutral-500 hover:text-red-400"
                onClick={() => onChange({ ...resume, skills: resume.skills.filter((x) => x.id !== s.id) })}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-[13px] text-neutral-100 placeholder-neutral-500 outline-none"
            placeholder="Type a skill and press +"
            onKeyDown={(e) => {
              const input = e.currentTarget
              if (e.key === 'Enter' && input.value.trim()) {
                onChange({ ...resume, skills: [...resume.skills, { id: uid(), name: input.value.trim(), level: 3 }] })
                input.value = ''
              }
            }}
          />
          <button
            className="rounded-lg border border-neutral-600 px-4 text-[13px] text-neutral-300 hover:border-neutral-400"
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement
              if (input?.value.trim()) {
                onChange({ ...resume, skills: [...resume.skills, { id: uid(), name: input.value.trim(), level: 3 }] })
                input.value = ''
              }
            }}
          >
            +
          </button>
        </div>
      </Section>

      <Section title="Projects">
        {resume.projects.map((p) => (
          <div key={p.id} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <div className="mb-2 flex justify-between text-[11px] text-neutral-500">
              <span>Project</span>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => onChange({ ...resume, projects: resume.projects.filter((x) => x.id !== p.id) })}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={p.name} onChange={(v) => {
                onChange({ ...resume, projects: resume.projects.map((x) => (x.id === p.id ? { ...x, name: v } : x)) })
              }} />
              <Field label="Link" value={p.link} onChange={(v) => {
                onChange({ ...resume, projects: resume.projects.map((x) => (x.id === p.id ? { ...x, link: v } : x)) })
              }} />
            </div>
            <Field textarea label="Description" value={p.description} onChange={(v) => {
              onChange({ ...resume, projects: resume.projects.map((x) => (x.id === p.id ? { ...x, description: v } : x)) })
            }} />
            <Field label="Tech (comma separated)" value={p.tech.join(', ')} onChange={(v) => {
              onChange({ ...resume, projects: resume.projects.map((x) =>
                x.id === p.id ? { ...x, tech: v.split(',').map((t) => t.trim()).filter(Boolean) } : x,
              ) })
            }} />
          </div>
        ))}
        <button
          className="rounded-lg border border-dashed border-neutral-600 px-3 py-2 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={() => onChange({ ...resume, projects: [...resume.projects, { id: uid(), name: '', description: '', link: '', tech: [] }] })}
        >
          + Add project
        </button>
      </Section>

      <Section title="Languages">
        <div className="flex flex-wrap gap-2">
          {resume.languages.map((l) => (
            <span key={l.id} className="flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-[12px]">
              {l.name} <span className="text-neutral-500">· {l.proficiency}</span>
              <button
                className="text-neutral-500 hover:text-red-400"
                onClick={() => onChange({ ...resume, languages: resume.languages.filter((x) => x.id !== l.id) })}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-[13px] text-neutral-100 placeholder-neutral-500 outline-none"
            placeholder="e.g. Amharic · Native"
            onKeyDown={(e) => {
              const input = e.currentTarget
              if (e.key === 'Enter' && input.value.trim()) {
                const [name, ...rest] = input.value.trim().split('·')
                onChange({ ...resume, languages: [...resume.languages, { id: uid(), name: name.trim(), proficiency: rest.join('·').trim() || 'Fluent' }] })
                input.value = ''
              }
            }}
          />
        </div>
      </Section>

      <Section title="Custom sections">
        <p className="mb-3 text-[12px] text-neutral-500">
          For Certificates, Awards, Volunteer work, or anything else — each section has a title and a list of entries.
        </p>
        {resume.custom.map((sec) => (
          <div key={sec.id} className="rounded-lg border border-neutral-800 bg-neutral-900 p-3">
            <div className="mb-2 flex justify-between text-[11px] text-neutral-500">
              <span>Section</span>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => onChange({ ...resume, custom: resume.custom.filter((x) => x.id !== sec.id) })}
              >
                Remove
              </button>
            </div>
            <Field label="Title" value={sec.title} onChange={(v) => {
              onChange({ ...resume, custom: resume.custom.map((x) => (x.id === sec.id ? { ...x, title: v } : x)) })
            }} placeholder="Certificates" />
            <Field textarea label="Entries (one per line)" value={sec.items.join('\n')} onChange={(v) => {
              onChange({ ...resume, custom: resume.custom.map((x) =>
                x.id === sec.id ? { ...x, items: v.split('\n').filter(Boolean) } : x,
              ) })
            }} placeholder={'Final Project Exhibition — awarded 1st place.\nUniversity Volunteer Service — health awareness campaign.'} />
          </div>
        ))}
        <button
          className="rounded-lg border border-dashed border-neutral-600 px-3 py-2 text-[12px] text-neutral-400 hover:border-neutral-400 hover:text-neutral-200"
          onClick={() => onChange({ ...resume, custom: [...resume.custom, { id: uid(), title: '', items: [] }] })}
        >
          + Add section
        </button>
      </Section>
    </div>
  )
}
