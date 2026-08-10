import type { ResumeSchema } from '../types/resume'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
      {children}
    </h2>
  )
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[12px] text-neutral-600">
      <span className="font-semibold text-neutral-800">{label}: </span>
      {value}
    </p>
  )
}

export function ExecutiveTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits = [c.phone, c.email, c.location, c.website, c.linkedin, c.github].filter(Boolean)

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-neutral-50 px-10 py-7">
        {c.fullName && (
          <h1 className="text-[28px] font-extrabold uppercase tracking-[0.06em]">{c.fullName}</h1>
        )}
        {c.headline && (
          <p className="mt-1 text-[13px] font-medium" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
      </header>

      <div className="flex">
        {/* Left column: contact / education / skills */}
        <aside className="w-[30%] shrink-0 border-r border-neutral-200 bg-neutral-50/60 px-6 py-6">
          {contactBits.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-1.5">
                {c.phone && <ContactRow label="Phone" value={c.phone} />}
                {c.email && <ContactRow label="Email" value={c.email} />}
                {c.location && <ContactRow label="Address" value={c.location} />}
                {c.website && <ContactRow label="Web" value={c.website} />}
                {c.linkedin && <ContactRow label="LinkedIn" value={c.linkedin} />}
                {c.github && <ContactRow label="GitHub" value={c.github} />}
              </div>
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Education</SectionLabel>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[12.5px] font-bold">{e.school || e.degree}</h3>
                    {e.degree && e.school && <p className="text-[12px] text-neutral-600">{e.degree}</p>}
                    {(e.startDate || e.endDate) && (
                      <p className="text-[11px] text-neutral-500">
                        {e.startDate} — {e.endDate}
                      </p>
                    )}
                    {e.details && <p className="mt-0.5 text-[11.5px] text-neutral-600">{e.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div>
              <SectionLabel>Skills</SectionLabel>
              <ul className="space-y-1.5">
                {resume.skills.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-2 text-[12px]">
                    <span className="text-neutral-700">{s.name}</span>
                    <span className="text-[9px] tracking-wider text-neutral-400">
                      {'●'.repeat(Math.max(1, s.level))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.languages.length > 0 && (
            <div className="mt-6">
              <SectionLabel>Languages</SectionLabel>
              <ul className="space-y-1 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    {l.name}
                    {l.proficiency ? ` — ${l.proficiency}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right column: summary / experience / projects / custom */}
        <main className="flex-1 px-7 py-6">
          {resume.summary && (
            <div className="mb-7">
              <SectionLabel>Summary</SectionLabel>
              <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <SectionLabel>Work Experience</SectionLabel>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13.5px] font-bold text-neutral-800">
                        {e.role}
                        {e.company && <span className="font-medium text-neutral-600"> · {e.company}</span>}
                      </h3>
                      {(e.startDate || e.endDate || e.current) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
                          ({e.startDate} - {e.current ? 'Present' : e.endDate})
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
            </div>
          )}

          {resume.projects.length > 0 && (
            <div className="mb-7">
              <SectionLabel>Projects</SectionLabel>
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
            </div>
          )}

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mb-7">
                <SectionLabel>{sec.title || 'Additional'}</SectionLabel>
                <ul className="space-y-1.5">
                  {sec.items.map((it, i) => (
                    <li key={i} className="text-[12.5px] leading-relaxed text-neutral-600">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </main>
      </div>
    </div>
  )
}
