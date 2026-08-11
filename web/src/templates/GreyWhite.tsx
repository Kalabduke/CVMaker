import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function SidebarTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
      {children}
    </h2>
  )
}

function MainTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="mb-3 border-b pb-1 text-[11.5px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: accent, color: accent }}>
      {children}
    </h2>
  )
}

export function GreyWhiteTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact
  const contactBits: { label: string; value: string; path: string; placeholder: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', value: c.phone, path: 'contact.phone', placeholder: '+251 ...' })
  if (c.email) contactBits.push({ label: 'Email', value: c.email, path: 'contact.email', placeholder: 'email@example.com' })
  if (c.location) contactBits.push({ label: 'Address', value: c.location, path: 'contact.location', placeholder: 'City, Country' })
  if (c.website) contactBits.push({ label: 'Web', value: c.website, path: 'contact.website', placeholder: 'https://...' })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', value: c.linkedin, path: 'contact.linkedin', placeholder: 'linkedin.com/in/...' })
  if (c.github) contactBits.push({ label: 'GitHub', value: c.github, path: 'contact.github', placeholder: 'github.com/...' })

  const allContactBits: { label: string; value: string; path: string; placeholder: string }[] = [
    { label: 'Phone', value: c.phone || '', path: 'contact.phone', placeholder: '+251 ...' },
    { label: 'Email', value: c.email || '', path: 'contact.email', placeholder: 'email@example.com' },
    { label: 'Address', value: c.location || '', path: 'contact.location', placeholder: 'City, Country' },
    { label: 'Web', value: c.website || '', path: 'contact.website', placeholder: 'https://...' },
    { label: 'LinkedIn', value: c.linkedin || '', path: 'contact.linkedin', placeholder: 'linkedin.com/in/...' },
    { label: 'GitHub', value: c.github || '', path: 'contact.github', placeholder: 'github.com/...' },
  ]
  const shownContact = editable ? allContactBits : contactBits

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="px-10 pb-5 pt-8">
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mb-4 h-28 w-28 rounded-full object-cover"
            style={{ border: `3px solid ${accent}` }}
          />
        )}
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="block text-[30px] font-extrabold tracking-tight text-neutral-800"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mt-1 block text-[14px] font-medium uppercase tracking-[0.18em]"
          style={{ color: accent }}
          placeholder="Headline"
        />
      </header>

      <div className="flex">
        {/* Sidebar: contact / skills / languages */}
        <aside className="w-[30%] shrink-0 bg-neutral-100 px-6 py-6">
          {(editable || contactBits.length > 0) && (
            <div className="mb-7">
              <SidebarTitle accent={accent}>Contact</SidebarTitle>
              <div className="space-y-1.5 text-[12px] text-neutral-600">
                {shownContact.map((b) => (
                  <p key={b.label}>
                    <span className="font-semibold text-neutral-800">{b.label}: </span>
                    <EditableText path={b.path} value={b.value} placeholder={b.placeholder} />
                  </p>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div className="mb-7">
              <SidebarTitle accent={accent}>Skills</SidebarTitle>
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
            <div>
              <SidebarTitle accent={accent}>Language</SidebarTitle>
              <ul className="space-y-1.5 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    <div className="flex items-center justify-between gap-2">
                      <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                      {(editable || l.proficiency) && (
                        <span className="text-neutral-400">
                          (<EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />)
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mt-7">
                <SidebarTitle accent={accent}>
                  <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Additional" />
                </SidebarTitle>
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

        {/* Main: summary / education / experience / projects */}
        <main className="flex-1 px-8 py-6">
          {(editable || resume.summary) && (
            <div className="mb-7">
              <MainTitle accent={accent}>Summary</MainTitle>
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

          {resume.education.length > 0 && (
            <div className="mb-7">
              <MainTitle accent={accent}>Education</MainTitle>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <EditableText
                        as="h3"
                        path={`education.${e.id}.degree`}
                        value={e.degree}
                        className="block text-[13px] font-bold text-neutral-800"
                        placeholder="Degree"
                      />
                      {(editable || e.startDate || e.endDate) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
                          <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                          {' - '}
                          <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-neutral-600">
                      <EditableText path={`education.${e.id}.school`} value={e.school} placeholder="School" />
                      {(editable || e.location) ? (
                        <>
                          {' · '}
                          <EditableText path={`education.${e.id}.location`} value={e.location} placeholder="Location" />
                        </>
                      ) : null}
                    </p>
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

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <MainTitle accent={accent}>Experience</MainTitle>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <EditableText
                        as="h3"
                        path={`experience.${e.id}.role`}
                        value={e.role}
                        className="block text-[13.5px] font-bold text-neutral-800"
                        placeholder="Role"
                      />
                      {(editable || e.startDate || e.endDate || e.current) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
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
                    <p className="text-[12px] font-medium text-neutral-600">
                      <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                      {(editable || e.location) ? (
                        <>
                          {' · '}
                          <EditableText path={`experience.${e.id}.location`} value={e.location} placeholder="Location" />
                        </>
                      ) : null}
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
              <MainTitle accent={accent}>Projects</MainTitle>
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
                    {(editable || p.description) && (
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
  )
}
