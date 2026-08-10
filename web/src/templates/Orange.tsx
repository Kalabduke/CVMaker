import type { ResumeSchema } from '../types/resume'

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
  const c = resume.contact
  const contactBits: { label: string; value: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', value: c.phone })
  if (c.email) contactBits.push({ label: 'Email', value: c.email })
  if (c.location) contactBits.push({ label: 'Address', value: c.location })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', value: c.linkedin })
  if (c.website) contactBits.push({ label: 'Web', value: c.website })
  if (c.github) contactBits.push({ label: 'GitHub', value: c.github })

  return (
    <div className="min-h-full bg-white px-12 py-10 text-neutral-800">
      {/* Header */}
      <header className="mb-8 flex flex-wrap items-start justify-between gap-6 border-b-2 pb-6" style={{ borderColor: accent }}>
        <div>
          {c.photoUrl && (
            <img
              src={c.photoUrl}
              alt={c.fullName || 'Profile'}
              className="mb-3 h-24 w-24 rounded-full border-2 object-cover"
              style={{ borderColor: accent }}
            />
          )}
          {c.fullName && (
            <h1 className="text-[32px] font-extrabold leading-tight" style={{ color: accent }}>
              {c.fullName}
            </h1>
          )}
          {c.headline && (
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
              {c.headline}
            </p>
          )}
        </div>
        {contactBits.length > 0 && (
          <div
            className="min-w-[220px] rounded-md p-4 text-[12px]"
            style={{ background: accent, color: '#fff' }}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">Contact</p>
            <div className="space-y-1.5">
              {contactBits.map((b) => (
                <p key={b.label}>
                  <span className="font-semibold">{b.label}: </span>
                  {b.value}
                </p>
              ))}
            </div>
          </div>
        )}
      </header>

      {resume.summary && (
        <section className="mb-7">
          <SectionTitle accent={accent}>Professional Summary</SectionTitle>
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
                    {(e.startDate || e.endDate || e.current) && (
                      <span className="ml-2 text-[11.5px] font-medium text-neutral-500">
                        | {e.startDate} - {e.current ? 'present' : e.endDate}
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-[12.5px] font-medium" style={{ color: accent }}>
                  {e.company}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
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
          <SectionTitle accent={accent}>Academic History</SectionTitle>
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
                <p className="text-[12.5px] text-neutral-600">
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
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s) => (
              <span
                key={s.id}
                className="rounded-full border px-3 py-1 text-[11.5px] font-medium"
                style={{ borderColor: accent, color: accent }}
              >
                {s.name}
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
            <SectionTitle accent={accent}>{sec.title || 'Awards & Certification'}</SectionTitle>
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
