import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-800">
      {children}
    </h2>
  )
}

export function MonochromeTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact

  return (
    <div className="min-h-full bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b-4 px-10 py-8 text-center" style={{ borderColor: accent }}>
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
            style={{ filter: 'grayscale(100%)', border: `3px solid ${accent}` }}
          />
        )}
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="block text-[30px] font-light uppercase tracking-[0.08em] text-neutral-900"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mt-1.5 block text-[14px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent }}
          placeholder="Headline"
        />
      </header>

      <div className="px-10 py-6">
        {(editable || resume.summary) && (
          <section className="mb-8">
            <Label>Summary</Label>
            <EditableText
              as="p"
              path="summary"
              value={resume.summary}
              className="block text-[13px] leading-relaxed text-neutral-700"
              placeholder="Write a short summary…"
              multiline
            />
          </section>
        )}

        <div className="flex gap-8">
          {/* Left: contact / skills / education / languages */}
          <aside className="w-[32%] shrink-0 space-y-7">
            {(editable || c.phone || c.email || c.location || c.website || c.linkedin || c.github) && (
              <div>
                <Label>Contact</Label>
                <div className="space-y-1 text-[12px] text-neutral-600">
                  <p>
                    <span className="font-semibold text-neutral-800">Phone: </span>
                    <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-800">Email: </span>
                    <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-800">Address: </span>
                    <EditableText path="contact.location" value={c.location} placeholder="City, Country" />
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-800">Web: </span>
                    <EditableText path="contact.website" value={c.website} placeholder="https://..." />
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-800">LinkedIn: </span>
                    <EditableText path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." />
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-800">GitHub: </span>
                    <EditableText path="contact.github" value={c.github} placeholder="github.com/..." />
                  </p>
                </div>
              </div>
            )}

            {resume.skills.length > 0 && (
              <div>
                <Label>Skills</Label>
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

            {resume.education.length > 0 && (
              <div>
                <Label>Education</Label>
                <div className="space-y-4">
                  {resume.education.map((e) => (
                    <div key={e.id}>
                      <EditableText
                        as="h3"
                        path={`education.${e.id}.school`}
                        value={e.school}
                        className="block text-[12px] font-bold uppercase tracking-wide text-neutral-800"
                        placeholder="School"
                      />
                      {(editable || e.startDate || e.endDate) && (
                        <p className="text-[11px] text-neutral-500">
                          <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                          {' - '}
                          <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                        </p>
                      )}
                      {(editable || e.degree) && (
                        <EditableText
                          as="p"
                          path={`education.${e.id}.degree`}
                          value={e.degree}
                          className="block text-[11.5px] text-neutral-600"
                          placeholder="Degree"
                        />
                      )}
                      {(editable || e.details) && (
                        <EditableText
                          as="p"
                          path={`education.${e.id}.details`}
                          value={e.details}
                          className="block text-[11px] text-neutral-500"
                          placeholder="Details"
                          multiline
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.languages.length > 0 && (
              <div>
                <Label>Language</Label>
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

            {resume.custom.length > 0 &&
              resume.custom.map((sec) => (
                <div key={sec.id}>
                  <Label>
                    <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Section title" />
                  </Label>
                  {(editable || sec.items.length > 0) && (
                    <ul className="space-y-1.5">
                      {sec.items.map((it, i) => (
                        <li key={i} className="text-[11.5px] leading-relaxed text-neutral-600">
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

          {/* Right: experience / projects */}
          <main className="flex-1 space-y-7">
            {resume.experience.length > 0 && (
              <div>
                <Label>Experience</Label>
                <div className="space-y-5">
                  {resume.experience.map((e) => (
                    <div key={e.id}>
                      <div className="flex items-baseline justify-between gap-3">
                        <EditableText
                          as="h3"
                          path={`experience.${e.id}.role`}
                          value={e.role}
                          className="block text-[13px] font-bold uppercase tracking-wide text-neutral-900"
                          placeholder="Role"
                        />
                        {(editable || e.startDate || e.endDate || e.current) && (
                          <span className="shrink-0 text-[11px] font-medium text-neutral-500">
                            <EditableText path={`experience.${e.id}.startDate`} value={e.startDate} placeholder="2023" />
                            {' - '}
                            <EditableText
                              path={`experience.${e.id}.endDate`}
                              value={e.current ? 'Present' : e.endDate}
                              placeholder="2025"
                            />
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] font-medium text-neutral-700">
                        <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                        {(editable || e.location) && (
                          <>
                            {' '}
                            · <EditableText path={`experience.${e.id}.location`} value={e.location} placeholder="Location" />
                          </>
                        )}
                      </p>
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
                <Label>Projects</Label>
                <div className="space-y-4">
                  {resume.projects.map((p) => (
                    <div key={p.id}>
                      <h3 className="text-[13px] font-bold text-neutral-900">
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
        </div>
      </div>
    </div>
  )
}
