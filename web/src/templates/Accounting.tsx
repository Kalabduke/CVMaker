import type { ResumeSchema } from '../types/resume'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">
      {children}
    </h2>
  )
}

export function AccountingTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits = [c.phone, c.email, c.location, c.website, c.linkedin, c.github].filter(Boolean)

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="border-b-2 border-neutral-200 px-10 py-7 text-center">
        {c.fullName && (
          <h1 className="text-[30px] font-extrabold uppercase tracking-[0.08em]">{c.fullName}</h1>
        )}
        {c.headline && (
          <p className="mt-1.5 text-[14px] font-medium" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
      </header>

      <div className="flex">
        {/* Left column: summary / experience */}
        <main className="w-[65%] border-r border-neutral-200 px-7 py-6">
          {resume.summary && (
            <div className="mb-7">
              <SectionLabel>Career Summary</SectionLabel>
              <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <SectionLabel>Experience</SectionLabel>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[14px] font-bold text-neutral-800">
                      {e.role}
                      {e.company && <span className="font-medium text-neutral-600">, {e.company}</span>}
                    </h3>
                    {(e.startDate || e.endDate || e.current) && (
                      <p className="text-[11.5px] font-medium text-neutral-500">
                        {e.startDate} - {e.current ? 'Present' : e.endDate}
                      </p>
                    )}
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
            <div>
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
        </main>

        {/* Right column: contact / education / skills / custom */}
        <aside className="w-[35%] shrink-0 px-6 py-6">
          {contactBits.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-1.5 text-[12px] text-neutral-600">
                {c.phone && <p>☎ {c.phone}</p>}
                {c.email && <p>✉ {c.email}</p>}
                {c.location && <p>{c.location}</p>}
                {c.website && <p>{c.website}</p>}
                {c.linkedin && <p>{c.linkedin}</p>}
                {c.github && <p>{c.github}</p>}
              </div>
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="mb-6">
              <SectionLabel>Education</SectionLabel>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[12.5px] font-bold text-neutral-800">{e.degree}</h3>
                    {e.school && <p className="text-[12px] text-neutral-600">{e.school}</p>}
                    {(e.startDate || e.endDate) && (
                      <p className="text-[11px] text-neutral-500">
                        {e.startDate} - {e.endDate}
                      </p>
                    )}
                    {e.details && <p className="mt-0.5 text-[11.5px] text-neutral-600">{e.details}</p>}
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
            <div className="mb-6">
              <SectionLabel>Languages</SectionLabel>
              <ul className="space-y-1 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    {l.name}
                    {l.proficiency ? ` (${l.proficiency})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mb-6">
                <SectionLabel>{sec.title || 'Additional'}</SectionLabel>
                <ul className="space-y-1.5">
                  {sec.items.map((it, i) => (
                    <li key={i} className="text-[12px] leading-relaxed text-neutral-600">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </aside>
      </div>
    </div>
  )
}
