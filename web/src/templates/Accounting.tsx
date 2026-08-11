import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">
      {children}
    </h2>
  )
}

export function AccountingTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact
  const contactBits = [c.phone, c.email, c.location, c.website, c.linkedin, c.github].filter(Boolean)

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="border-b-2 border-neutral-200 px-10 py-7 text-center">
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="block text-[30px] font-extrabold uppercase tracking-[0.08em]"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mt-1.5 block text-[14px] font-medium"
          style={{ color: accent }}
          placeholder="Headline"
        />
      </header>

      <div className="flex">
        {/* Left column: summary / experience */}
        <main className="w-[65%] border-r border-neutral-200 px-7 py-6">
          {(editable || resume.summary) && (
            <div className="mb-7">
              <SectionLabel>Career Summary</SectionLabel>
              <EditableText
                as="p"
                path="summary"
                value={resume.summary}
                className="block text-[13px] leading-relaxed text-neutral-700"
                placeholder="Write a short summary…"
                multiline
              />
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <SectionLabel>Experience</SectionLabel>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[14px] font-bold text-neutral-800">
                      <EditableText path={`experience.${e.id}.role`} value={e.role} placeholder="Role" />
                      {e.company && (
                        <span className="font-medium text-neutral-600">
                          , <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                        </span>
                      )}
                    </h3>
                    {(editable || e.startDate || e.endDate || e.current) && (
                      <p className="text-[11.5px] font-medium text-neutral-500">
                        <EditableText path={`experience.${e.id}.startDate`} value={e.startDate} placeholder="2023" />
                        {' - '}
                        <EditableText
                          path={`experience.${e.id}.endDate`}
                          value={e.current ? 'Present' : e.endDate}
                          placeholder="2025"
                        />
                      </p>
                    )}
                    {(editable || e.location) && (
                      <EditableText
                        as="p"
                        path={`experience.${e.id}.location`}
                        value={e.location}
                        className="block text-[11.5px] text-neutral-500"
                        placeholder="Location"
                      />
                    )}
                    {(editable || e.bullets.length > 0) && (
                      <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-neutral-600">
                        {e.bullets.map((b, i) => (
                          <li key={i}>
                            <EditableText path={`experience.${e.id}.bullets.${i}`} value={b} placeholder="Accomplishment" />
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

          {resume.projects.length > 0 && (
            <div>
              <SectionLabel>Projects</SectionLabel>
              <div className="space-y-4">
                {resume.projects.map((p) => (
                  <div key={p.id}>
                    <h3 className="text-[13px] font-bold text-neutral-800">
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
                        className="mt-0.5 block text-[12.5px] leading-relaxed text-neutral-600"
                        placeholder="Describe the project…"
                        multiline
                      />
                    )}
                    {(editable || p.tech.length > 0) && (
                      <EditableText
                        as="p"
                        path={`projects.${p.id}.tech`}
                        value={p.tech.join(' · ')}
                        className="mt-0.5 block text-[11px] text-neutral-500"
                        placeholder="Tech · stack"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right column: contact / education / skills / custom */}
        <aside className="w-[35%] shrink-0 px-6 py-6">
          {(editable || contactBits.length > 0) && (
            <div className="mb-6">
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-1.5 text-[12px] text-neutral-600">
                <p>
                  ☎ <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
                </p>
                <p>
                  ✉ <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
                </p>
                <EditableText as="p" path="contact.location" value={c.location} placeholder="City, Country" className="block" />
                <EditableText as="p" path="contact.website" value={c.website} placeholder="https://..." className="block" />
                <EditableText as="p" path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." className="block" />
                <EditableText as="p" path="contact.github" value={c.github} placeholder="github.com/..." className="block" />
              </div>
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Education</SectionLabel>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <EditableText
                      as="h3"
                      path={`education.${e.id}.degree`}
                      value={e.degree}
                      className="block text-[12.5px] font-bold text-neutral-800"
                      placeholder="Degree"
                    />
                    {(editable || e.school) && (
                      <EditableText
                        as="p"
                        path={`education.${e.id}.school`}
                        value={e.school}
                        className="block text-[12px] text-neutral-600"
                        placeholder="School"
                      />
                    )}
                    {(editable || e.startDate || e.endDate) && (
                      <p className="text-[11px] text-neutral-500">
                        <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                        {' - '}
                        <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                      </p>
                    )}
                    {(editable || e.details) && (
                      <EditableText
                        as="p"
                        path={`education.${e.id}.details`}
                        value={e.details}
                        className="mt-0.5 block text-[11.5px] text-neutral-600"
                        placeholder="Details"
                        multiline
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Skills</SectionLabel>
              <ul className="space-y-1.5">
                {resume.skills.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-2 text-[12px]">
                    <EditableText path={`skills.${s.id}.name`} value={s.name} className="text-neutral-700" placeholder="Skill" />
                    <span className="text-[9px] tracking-wider text-neutral-400">
                      {'●'.repeat(Math.max(1, s.level))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.languages.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Languages</SectionLabel>
              <ul className="space-y-1 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                    {(editable || l.proficiency) && (
                      <>
                        {' '}
                        (<EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />)
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mb-6">
                <SectionLabel>
                  <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Section title" />
                </SectionLabel>
                {(editable || sec.items.length > 0) && (
                  <ul className="space-y-1.5">
                    {sec.items.map((it, i) => (
                      <li key={i} className="text-[12px] leading-relaxed text-neutral-600">
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
        </aside>
      </div>
    </div>
  )
}
