import type { ResumeSchema } from '../types/resume'

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
      {children}
    </h2>
  )
}

export function PurpleTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits = [c.email, c.phone, c.location, c.website, c.linkedin, c.github].filter(Boolean)

  return (
    <div className="min-h-full bg-white px-12 py-10 text-neutral-800">
      {/* Header */}
      <header className="mb-7 text-center">
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover"
            style={{ border: `3px solid ${accent}` }}
          />
        )}
        {c.fullName && (
          <h1 className="text-[30px] font-extrabold uppercase tracking-[0.08em] text-neutral-800">
            {c.fullName}
          </h1>
        )}
        {c.headline && (
          <p className="mt-1.5 text-[14px] font-medium" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
        {contactBits.length > 0 && (
          <p className="mt-3 text-[12px] text-neutral-500">
            {contactBits.join('  •  ')}
          </p>
        )}
        <div className="mx-auto mt-5 h-[3px] w-16" style={{ background: accent }} />
      </header>

      {resume.summary && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Summary</SectionTitle>
          <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
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
                    {e.role}
                    {e.company && <span className="font-medium text-neutral-600">, {e.company}</span>}
                  </h3>
                  {(e.startDate || e.endDate || e.current) && (
                    <span className="shrink-0 text-[11.5px] text-neutral-500">
                      {e.startDate} - {e.current ? 'Present' : e.endDate}
                    </span>
                  )}
                </div>
                {e.location && <p className="text-[11.5px] text-neutral-500">{e.location}</p>}
                {e.bullets.length > 0 && (
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-neutral-600">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Education</SectionTitle>
          <div className="space-y-4">
            {resume.education.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[13px] font-bold text-neutral-800">{e.degree}</h3>
                  {(e.startDate || e.endDate) && (
                    <span className="shrink-0 text-[11.5px] text-neutral-500">
                      {e.startDate} - {e.endDate}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-neutral-600">
                  {e.school}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                {e.details && <p className="mt-0.5 text-[12px] text-neutral-600">{e.details}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {resume.skills.length > 0 && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Skills</SectionTitle>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {resume.skills.map((s) => (
              <span key={s.id} className="text-[12.5px] text-neutral-700">
                {s.name}
                <span className="ml-1 text-[10px] text-neutral-400">{'●'.repeat(Math.max(1, s.level))}</span>
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
                  {p.name}
                  {p.link && <span className="ml-2 text-[11px] font-normal text-neutral-500">{p.link}</span>}
                </h3>
                {p.description && (
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-neutral-600">{p.description}</p>
                )}
                {p.tech.length > 0 && (
                  <p className="mt-0.5 text-[11px] text-neutral-500">{p.tech.join(' · ')}</p>
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
                {l.name}
                {l.proficiency ? ` (${l.proficiency})` : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.custom.length > 0 &&
        resume.custom.map((sec) => (
          <section key={sec.id} className="mb-7">
            <SectionTitle accent={accent}>{sec.title || 'Additional Information'}</SectionTitle>
            <ul className="space-y-1.5">
              {sec.items.map((it, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-neutral-600">
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  )
}
