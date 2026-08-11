import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-pink-200 pb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-700">
      {children}
    </h2>
  )
}

export function PinkTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="px-10 pb-6 pt-8 text-center" style={{ background: '#fdf2f8' }}>
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-4 h-28 w-28 rounded-full border-4 object-cover"
            style={{ borderColor: accent }}
          />
        )}
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="block text-[32px] font-extrabold leading-tight text-neutral-800"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mt-1.5 block text-[13px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: accent }}
          placeholder="Headline"
        />
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[30%] shrink-0 px-6 py-6" style={{ background: '#fdf2f8' }}>
          {(editable || resume.summary) && (
            <div className="mb-7">
              <SidebarTitle>About Me</SidebarTitle>
              <EditableText
                as="p"
                path="summary"
                value={resume.summary}
                className="block text-[12px] leading-relaxed text-neutral-600"
                placeholder="Write a short summary…"
                multiline
              />
            </div>
          )}

          {(editable || c.phone || c.email || c.website || c.linkedin || c.github || c.location) && (
            <div className="mb-7">
              <SidebarTitle>Contact</SidebarTitle>
              <div className="space-y-1.5 text-[11.5px] text-neutral-600">
                <p>
                  <span className="font-semibold text-neutral-700">Phone: </span>
                  <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">Email: </span>
                  <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">Web: </span>
                  <EditableText path="contact.website" value={c.website} placeholder="https://..." />
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">LinkedIn: </span>
                  <EditableText path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." />
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">GitHub: </span>
                  <EditableText path="contact.github" value={c.github} placeholder="github.com/..." />
                </p>
                <p>
                  <span className="font-semibold text-neutral-700">Address: </span>
                  <EditableText path="contact.location" value={c.location} placeholder="City, Country" />
                </p>
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div className="mb-7">
              <SidebarTitle>Skills</SidebarTitle>
              <ul className="space-y-1.5">
                {resume.skills.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-[12px] text-neutral-700">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                    <EditableText path={`skills.${s.id}.name`} value={s.name} placeholder="Skill" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.languages.length > 0 && (
            <div>
              <SidebarTitle>Languages</SidebarTitle>
              <ul className="space-y-1 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                    {(editable || l.proficiency) && (
                      <>
                        {' '}
                        — <EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className="flex-1 px-8 py-6">
          {resume.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Work Experience
              </h2>
              <div className="space-y-6">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[13.5px] font-extrabold uppercase tracking-wide text-neutral-800">
                      <EditableText path={`experience.${e.id}.role`} value={e.role} placeholder="Role" />
                      {e.company && (
                        <span className="font-medium text-neutral-600">
                          {' '}
                          · <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                        </span>
                      )}
                    </h3>
                    {(editable || e.startDate || e.endDate || e.current) && (
                      <p className="text-[11.5px] font-medium" style={{ color: accent }}>
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

          {resume.education.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Education
              </h2>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <EditableText
                      as="h3"
                      path={`education.${e.id}.degree`}
                      value={e.degree}
                      className="block text-[13px] font-extrabold uppercase tracking-wide text-neutral-800"
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
                      <p className="text-[11.5px] text-neutral-500">
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
                        className="mt-0.5 block text-[12px] text-neutral-600"
                        placeholder="Details"
                        multiline
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Projects
              </h2>
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

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mb-8">
                <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                  <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Section title" />
                </h2>
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
        </main>
      </div>
    </div>
  )
}
