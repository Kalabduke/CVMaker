import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2
      className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: accent }}
    >
      {children}
    </h2>
  )
}

export function ModernTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact
  return (
    <div className="flex min-h-full bg-white text-neutral-800">
      {/* Sidebar */}
      <aside
        className="w-[34%] shrink-0 px-6 py-8 text-white"
        style={{ background: accent }}
      >
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mb-4 h-28 w-28 rounded-full object-cover ring-2 ring-white/40"
          />
        )}
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="mb-1 block text-2xl font-extrabold leading-tight"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mb-6 block text-[12px] opacity-90"
          placeholder="Headline"
        />

        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">
              Skills
            </h2>
            <ul className="space-y-1.5">
              {resume.skills.map((s) => (
                <li key={s.id} className="text-[12px]">
                  <div className="flex justify-between">
                    <EditableText
                      path={`skills.${s.id}.name`}
                      value={s.name}
                      placeholder="Skill"
                    />
                    <span className="opacity-60">{'●'.repeat(s.level)}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-white/25">
                    <div
                      className="h-1 rounded-full bg-white"
                      style={{ width: `${(s.level / 5) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resume.languages.length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">
              Languages
            </h2>
            <ul className="space-y-1 text-[12px]">
              {resume.languages.map((l) => (
                <li key={l.id}>
                  <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                  <span className="opacity-70">
                    {' '}
                    · <EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-8">
        {(editable || c.email || c.phone || c.location || c.linkedin || c.github || c.website) && (
          <div className="mb-6 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-neutral-500">
            <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
            <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
            <EditableText path="contact.location" value={c.location} placeholder="City, Country" />
            <EditableText path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." />
            <EditableText path="contact.github" value={c.github} placeholder="github.com/..." />
            <EditableText path="contact.website" value={c.website} placeholder="https://..." />
          </div>
        )}

        {(editable || resume.summary) && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Summary</SectionTitle>
            <EditableText
              as="p"
              path="summary"
              value={resume.summary}
              className="block text-[13px] leading-relaxed"
              placeholder="Write a short summary…"
              multiline
            />
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Experience</SectionTitle>
            <div className="space-y-4">
              {resume.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <EditableText
                      as="h3"
                      path={`experience.${e.id}.role`}
                      value={e.role}
                      className="block text-[13.5px] font-bold"
                      placeholder="Role"
                    />
                    <span className="shrink-0 text-[11px] text-neutral-500">
                      <EditableText path={`experience.${e.id}.startDate`} value={e.startDate} placeholder="2023" />
                      {' — '}
                      <EditableText
                        path={`experience.${e.id}.endDate`}
                        value={e.current ? 'Present' : e.endDate}
                        placeholder="2025"
                      />
                    </span>
                  </div>
                  <p className="text-[12px] font-medium" style={{ color: accent }}>
                    <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                    {(editable || e.location) && (
                      <>
                        {' '}
                        · <EditableText path={`experience.${e.id}.location`} value={e.location} placeholder="Location" />
                      </>
                    )}
                  </p>
                  {(editable || e.bullets.length > 0) && (
                    <ul className="mt-1.5 list-disc pl-4 text-[12.5px] leading-relaxed text-neutral-600">
                      {e.bullets.map((b, i) => (
                        <li key={i}>
                          <EditableText
                            path={`experience.${e.id}.bullets.${i}`}
                            value={b}
                            placeholder="Accomplishment"
                          />
                        </li>
                      ))}
                      {editable && (
                        <li>
                          <EditableText
                            path={`experience.${e.id}.bullets.${e.bullets.length}`}
                            value=""
                            placeholder="+ Add a bullet"
                          />
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Education</SectionTitle>
            <div className="space-y-3">
              {resume.education.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <EditableText
                      as="h3"
                      path={`education.${e.id}.degree`}
                      value={e.degree}
                      className="block text-[13px] font-bold"
                      placeholder="Degree"
                    />
                    <span className="shrink-0 text-[11px] text-neutral-500">
                      <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                      {' — '}
                      <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                    </span>
                  </div>
                  <p className="text-[12px] text-neutral-600">
                    <EditableText path={`education.${e.id}.school`} value={e.school} placeholder="School" />
                    {(editable || e.location) && (
                      <>
                        {' '}
                        · <EditableText path={`education.${e.id}.location`} value={e.location} placeholder="Location" />
                      </>
                    )}
                  </p>
                  {(editable || e.details) && (
                    <EditableText
                      as="p"
                      path={`education.${e.id}.details`}
                      value={e.details}
                      className="block text-[12px] text-neutral-500"
                      placeholder="Details (GPA, awards…)"
                      multiline
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Projects</SectionTitle>
            <div className="space-y-3">
              {resume.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-[13px] font-bold">
                    <EditableText path={`projects.${p.id}.name`} value={p.name} placeholder="Project name" />
                    {(editable || p.link) && (
                      <EditableText
                        path={`projects.${p.id}.link`}
                        value={p.link}
                        className="ml-2 text-[11px] font-normal text-neutral-500"
                        placeholder="link"
                      />
                    )}
                  </h3>
                  {p.description && (
                    <EditableText
                      as="p"
                      path={`projects.${p.id}.description`}
                      value={p.description}
                      className="block text-[12.5px] leading-relaxed text-neutral-600"
                      placeholder="Describe the project…"
                      multiline
                    />
                  )}
                  {(editable || p.tech.length > 0) && (
                    <EditableText
                      as="p"
                      path={`projects.${p.id}.tech`}
                      value={p.tech.join(' · ')}
                      className="mt-1 block text-[11px] text-neutral-500"
                      placeholder="Tech · stack"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.custom.length > 0 && (
          <div>
            {resume.custom.map((sec) => (
              <div key={sec.id} className="mb-6">
                <SectionTitle accent={accent}>
                  <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Section title" />
                </SectionTitle>
                {(editable || sec.items.length > 0) && (
                  <ul className="space-y-1.5">
                    {sec.items.map((it, i) => (
                      <li key={i} className="text-[12.5px] leading-relaxed text-neutral-600">
                        <EditableText path={`custom.${sec.id}.items.${i}`} value={it} placeholder="Item" multiline />
                      </li>
                    ))}
                    {editable && (
                      <li>
                        <EditableText
                          path={`custom.${sec.id}.items.${sec.items.length}`}
                          value=""
                          placeholder="+ Add item"
                        />
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
