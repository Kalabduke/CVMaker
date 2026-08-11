import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="shrink-0 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
        {children}
      </h2>
      <div className="h-px flex-1" style={{ background: accent, opacity: 0.3 }} />
    </div>
  )
}

export function OrangeTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact
  const contactBits: { label: string; path: string; value: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', path: 'contact.phone', value: c.phone })
  if (c.email) contactBits.push({ label: 'Email', path: 'contact.email', value: c.email })
  if (c.location) contactBits.push({ label: 'Address', path: 'contact.location', value: c.location })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', path: 'contact.linkedin', value: c.linkedin })
  if (c.website) contactBits.push({ label: 'Web', path: 'contact.website', value: c.website })
  if (c.github) contactBits.push({ label: 'GitHub', path: 'contact.github', value: c.github })

  return (
    <div className="min-h-full bg-white px-12 py-10 text-neutral-800">
      {/* Header */}
      <header
        className="mb-8 flex flex-wrap items-start justify-between gap-6 border-b-2 pb-6"
        style={{ borderColor: accent }}
      >
        <div>
          {c.photoUrl && (
            <img
              src={c.photoUrl}
              alt={c.fullName || 'Profile'}
              className="mb-3 h-24 w-24 rounded-full border-2 object-cover"
              style={{ borderColor: accent }}
            />
          )}
          <EditableText
            as="h1"
            path="contact.fullName"
            value={c.fullName}
            className="block text-[32px] font-extrabold leading-tight"
            style={{ color: accent }}
            placeholder="Full name"
          />
          <EditableText
            as="p"
            path="contact.headline"
            value={c.headline}
            className="mt-1 block text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
            placeholder="Headline"
          />
        </div>
        {(editable || contactBits.length > 0) && (
          <div
            className="min-w-[220px] rounded-md p-4 text-[12px]"
            style={{ background: accent, color: '#fff' }}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">Contact</p>
            <div className="space-y-1.5">
              <p>
                <span className="font-semibold">Phone: </span>
                <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
              </p>
              <p>
                <span className="font-semibold">Address: </span>
                <EditableText path="contact.location" value={c.location} placeholder="City, Country" />
              </p>
              <p>
                <span className="font-semibold">LinkedIn: </span>
                <EditableText path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." />
              </p>
              <p>
                <span className="font-semibold">Web: </span>
                <EditableText path="contact.website" value={c.website} placeholder="https://..." />
              </p>
              <p>
                <span className="font-semibold">GitHub: </span>
                <EditableText path="contact.github" value={c.github} placeholder="github.com/..." />
              </p>
            </div>
          </div>
        )}
      </header>

      {(editable || resume.summary) && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Professional Summary</SectionTitle>
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

      {resume.experience.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Work Experience</SectionTitle>
          <div className="space-y-5">
            {resume.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[13.5px] font-bold text-neutral-800">
                    <EditableText path={`experience.${e.id}.role`} value={e.role} placeholder="Role" />
                    {(editable || e.startDate || e.endDate || e.current) && (
                      <span className="ml-2 text-[11.5px] font-medium text-neutral-500">
                        | <EditableText path={`experience.${e.id}.startDate`} value={e.startDate} placeholder="2023" />
                        {' - '}
                        <EditableText
                          path={`experience.${e.id}.endDate`}
                          value={e.current ? 'present' : e.endDate}
                          placeholder="2025"
                        />
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-[12.5px] font-medium" style={{ color: accent }}>
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
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Academic History</SectionTitle>
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
                    <span className="shrink-0 text-[11.5px] text-neutral-500">
                      <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                      {' - '}
                      <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                    </span>
                  )}
                </div>
                <p className="text-[12.5px] text-neutral-600">
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
                    className="mt-0.5 block text-[12px] text-neutral-600"
                    placeholder="Details"
                    multiline
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <span
                key={s.id}
                className="rounded-full border px-3 py-1 text-[11.5px] font-medium"
                style={{ borderColor: accent, color: accent }}
              >
                <EditableText path={`skills.${s.id}.name`} value={s.name} placeholder="Skill" />
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Projects</SectionTitle>
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
        </section>
      )}

      {resume.languages.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Languages</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-neutral-600">
            {resume.languages.map((l) => (
              <span key={l.id}>
                <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                {(editable || l.proficiency) && (
                  <>
                    {' '}
                    (<EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />)
                  </>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.custom.length > 0 &&
        resume.custom.map((sec) => (
          <section key={sec.id} className="mb-7">
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
          </section>
        ))}
    </div>
  )
}
