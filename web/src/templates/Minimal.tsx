import type { ResumeSchema } from '../types/resume'
import { EditableText, useIsEditable } from '../components/EditableText'

function Rule({ accent }: { accent: string }) {
  return <div className="my-5 h-px w-full" style={{ background: accent, opacity: 0.35 }} />
}

export function MinimalTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const editable = useIsEditable()
  const c = resume.contact
  return (
    <div className="min-h-full bg-white px-14 py-12 text-neutral-800">
      <header className="text-center">
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
            style={{ border: `2px solid ${accent}` }}
          />
        )}
        <EditableText
          as="h1"
          path="contact.fullName"
          value={c.fullName}
          className="block text-3xl font-light uppercase tracking-[0.22em]"
          placeholder="Full name"
        />
        <EditableText
          as="p"
          path="contact.headline"
          value={c.headline}
          className="mt-2 block text-[13px] font-medium uppercase tracking-[0.14em]"
          style={{ color: accent }}
          placeholder="Headline"
        />
        {(editable || [c.email, c.phone, c.location, c.linkedin, c.github, c.website].some(Boolean)) && (
          <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px] text-neutral-500">
            <EditableText path="contact.email" value={c.email} placeholder="email@example.com" />
            <EditableText path="contact.phone" value={c.phone} placeholder="+251 ..." />
            <EditableText path="contact.location" value={c.location} placeholder="City, Country" />
            <EditableText path="contact.linkedin" value={c.linkedin} placeholder="linkedin.com/in/..." />
            <EditableText path="contact.github" value={c.github} placeholder="github.com/..." />
            <EditableText path="contact.website" value={c.website} placeholder="https://..." />
          </p>
        )}
      </header>

      {(editable || resume.summary) && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Summary
          </h2>
          <EditableText
            as="p"
            path="summary"
            value={resume.summary}
            className="block text-[13.5px] leading-relaxed text-neutral-600"
            placeholder="Write a short summary…"
            multiline
          />
        </section>
      )}

      {resume.experience.length > 0 && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Experience
          </h2>
          <div className="space-y-5">
            {resume.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <EditableText
                    as="h3"
                    path={`experience.${e.id}.role`}
                    value={e.role}
                    className="block text-[14px] font-semibold"
                    placeholder="Role"
                  />
                  <span className="shrink-0 text-[11.5px] text-neutral-500">
                    <EditableText path={`experience.${e.id}.startDate`} value={e.startDate} placeholder="2023" />
                    {' — '}
                    <EditableText
                      path={`experience.${e.id}.endDate`}
                      value={e.current ? 'Present' : e.endDate}
                      placeholder="2025"
                    />
                  </span>
                </div>
                <p className="text-[12.5px] text-neutral-500">
                  <EditableText path={`experience.${e.id}.company`} value={e.company} placeholder="Company" />
                  {(editable || e.location) && (
                    <>
                      {' '}
                      · <EditableText path={`experience.${e.id}.location`} value={e.location} placeholder="Location" />
                    </>
                  )}
                </p>
                {(editable || e.bullets.length > 0) && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] leading-relaxed text-neutral-600">
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
        <section>
          <Rule accent={accent} />
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <EditableText
                    as="h3"
                    path={`education.${e.id}.degree`}
                    value={e.degree}
                    className="block text-[13.5px] font-semibold"
                    placeholder="Degree"
                  />
                  <span className="shrink-0 text-[11.5px] text-neutral-500">
                    <EditableText path={`education.${e.id}.startDate`} value={e.startDate} placeholder="2022" />
                    {' — '}
                    <EditableText path={`education.${e.id}.endDate`} value={e.endDate} placeholder="2025" />
                  </span>
                </div>
                <p className="text-[12.5px] text-neutral-500">
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
                    className="mt-1 block text-[12px] text-neutral-600"
                    placeholder="Details (GPA, awards…)"
                    multiline
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <span
                key={s.id}
                className="rounded-full border px-3 py-1 text-[11.5px]"
                style={{ borderColor: accent, color: accent }}
              >
                <EditableText path={`skills.${s.id}.name`} value={s.name} placeholder="Skill" />
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((p) => (
              <div key={p.id}>
                <h3 className="text-[13.5px] font-semibold">
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
                    className="mt-1 block text-[12.5px] leading-relaxed text-neutral-600"
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
        </section>
      )}

      {resume.languages.length > 0 && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12.5px] text-neutral-600">
            {resume.languages.map((l) => (
              <span key={l.id}>
                <EditableText path={`languages.${l.id}.name`} value={l.name} placeholder="Language" />
                <span className="text-neutral-400">
                  {' '}
                  · <EditableText path={`languages.${l.id}.proficiency`} value={l.proficiency} placeholder="Level" />
                </span>
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.custom.length > 0 &&
        resume.custom.map((sec) => (
          <section key={sec.id}>
            <Rule accent={accent} />
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
              <EditableText path={`custom.${sec.id}.title`} value={sec.title} placeholder="Section title" />
            </h2>
            {(editable || sec.items.length > 0) && (
              <ul className="space-y-1.5 text-[12.5px] leading-relaxed text-neutral-600">
                {sec.items.map((it, i) => (
                  <li key={i}>
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
