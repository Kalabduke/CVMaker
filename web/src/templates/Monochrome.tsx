import type { ResumeSchema } from '../types/resume'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-800">
      {children}
    </h2>
  )
}

export function MonochromeTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits: { label: string; value: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', value: c.phone })
  if (c.email) contactBits.push({ label: 'Email', value: c.email })
  if (c.location) contactBits.push({ label: 'Address', value: c.location })
  if (c.website) contactBits.push({ label: 'Web', value: c.website })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', value: c.linkedin })
  if (c.github) contactBits.push({ label: 'GitHub', value: c.github })

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
        {c.fullName && (
          <h1 className="text-[30px] font-light uppercase tracking-[0.08em] text-neutral-900">
            {c.fullName}
          </h1>
        )}
        {c.headline && (
          <p className="mt-1.5 text-[14px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
      </header>

      <div className="px-10 py-6">
        {resume.summary && (
          <section className="mb-8">
            <Label>Summary</Label>
            <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
          </section>
        )}

        <div className="flex gap-8">
          {/* Left: contact / skills / education / languages */}
          <aside className="w-[32%] shrink-0 space-y-7">
            {contactBits.length > 0 && (
              <div>
                <Label>Contact</Label>
                <div className="space-y-1 text-[12px] text-neutral-600">
                  {contactBits.map((b) => (
                    <p key={b.label}>
                      <span className="font-semibold text-neutral-800">{b.label}: </span>
                      {b.value}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {resume.skills.length > 0 && (
              <div>
                <Label>Skills</Label>
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

            {resume.education.length > 0 && (
              <div>
                <Label>Education</Label>
                <div className="space-y-4">
                  {resume.education.map((e) => (
                    <div key={e.id}>
                      <h3 className="text-[12px] font-bold uppercase tracking-wide text-neutral-800">
                        {e.school}
                      </h3>
                      {(e.startDate || e.endDate) && (
                        <p className="text-[11px] text-neutral-500">
                          {e.startDate} - {e.endDate}
                        </p>
                      )}
                      <p className="text-[11.5px] text-neutral-600">{e.degree}</p>
                      {e.details && <p className="text-[11px] text-neutral-500">{e.details}</p>}
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
                      {l.name}
                      {l.proficiency ? ` — ${l.proficiency}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resume.custom.length > 0 &&
              resume.custom.map((sec) => (
                <div key={sec.id}>
                  <Label>{sec.title || 'References'}</Label>
                  <ul className="space-y-1.5">
                    {sec.items.map((it, i) => (
                      <li key={i} className="text-[11.5px] leading-relaxed text-neutral-600">
                        {it}
                      </li>
                    ))}
                  </ul>
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
                        <h3 className="text-[13px] font-bold uppercase tracking-wide text-neutral-900">
                          {e.role}
                        </h3>
                        {(e.startDate || e.endDate || e.current) && (
                          <span className="shrink-0 text-[11px] font-medium text-neutral-500">
                            {e.startDate} - {e.current ? 'Present' : e.endDate}
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] font-medium text-neutral-700">
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
              </div>
            )}

            {resume.projects.length > 0 && (
              <div>
                <Label>Projects</Label>
                <div className="space-y-4">
                  {resume.projects.map((p) => (
                    <div key={p.id}>
                      <h3 className="text-[13px] font-bold text-neutral-900">
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
    </div>
  )
}
