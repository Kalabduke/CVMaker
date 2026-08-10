import type { ResumeSchema } from '../types/resume'

function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
      {children}
    </h2>
  )
}

export function BlueGrayTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits = [c.phone, c.email, c.location, c.website, c.linkedin, c.github].filter(Boolean)

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header
        className="px-10 py-8 text-center"
        style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%)' }}
      >
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-3 h-24 w-24 rounded-full border-2 object-cover"
            style={{ borderColor: accent }}
          />
        )}
        {c.fullName && (
          <h1 className="text-[30px] font-extrabold uppercase tracking-[0.1em] text-neutral-800">
            {c.fullName}
          </h1>
        )}
        {c.headline && (
          <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
        {contactBits.length > 0 && (
          <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11.5px] text-neutral-500">
            {contactBits.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </p>
        )}
      </header>

      <div className="flex">
        {/* Left rail: skills / languages / custom */}
        <aside className="w-[30%] shrink-0 border-r border-neutral-200 px-6 py-6">
          {resume.skills.length > 0 && (
            <div className="mb-7">
              <SectionLabel accent={accent}>Skills</SectionLabel>
              <ul className="space-y-1.5">
                {resume.skills.map((s) => (
                  <li key={s.id} className="text-[12px] text-neutral-700">
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.languages.length > 0 && (
            <div className="mb-7">
              <SectionLabel accent={accent}>Languages</SectionLabel>
              <ul className="space-y-1.5 text-[12px] text-neutral-600">
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
              <div key={sec.id} className="mb-7">
                <SectionLabel accent={accent}>{sec.title || 'Additional'}</SectionLabel>
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

        {/* Main: profile / experience / education / projects */}
        <main className="flex-1 px-8 py-6">
          {resume.summary && (
            <div className="mb-7">
              <SectionLabel accent={accent}>Profile</SectionLabel>
              <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <SectionLabel accent={accent}>Work Experience</SectionLabel>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13.5px] font-bold text-neutral-800">
                        {e.role}
                        {e.company && <span className="font-medium text-neutral-600"> · {e.company}</span>}
                      </h3>
                      {(e.startDate || e.endDate || e.current) && (
                        <span className="shrink-0 text-[11px] font-medium text-neutral-500">
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
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="mb-7">
              <SectionLabel accent={accent}>Education</SectionLabel>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13px] font-bold text-neutral-800">
                        {e.degree}
                        {e.school && <span className="font-medium text-neutral-600"> · {e.school}</span>}
                      </h3>
                      {(e.startDate || e.endDate) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
                          {e.startDate} - {e.endDate}
                        </span>
                      )}
                    </div>
                    {e.location && <p className="text-[11.5px] text-neutral-500">{e.location}</p>}
                    {e.details && <p className="mt-0.5 text-[12px] text-neutral-600">{e.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.projects.length > 0 && (
            <div>
              <SectionLabel accent={accent}>Projects</SectionLabel>
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
      </div>
    </div>
  )
}
