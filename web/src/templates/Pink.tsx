import type { ResumeSchema } from '../types/resume'

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-pink-200 pb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-700">
      {children}
    </h2>
  )
}

export function PinkTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactBits: { label: string; value: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', value: c.phone })
  if (c.email) contactBits.push({ label: 'Email', value: c.email })
  if (c.website) contactBits.push({ label: 'Web', value: c.website })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', value: c.linkedin })
  if (c.github) contactBits.push({ label: 'GitHub', value: c.github })
  if (c.location) contactBits.push({ label: 'Address', value: c.location })

  return (
    <div className="min-h-full bg-white text-neutral-800">
      {/* Header */}
      <header className="px-10 pb-6 pt-8 text-center" style={{ background: '#fdf2f8' }}>
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mx-auto mb-4 h-28 w-28 rounded-full border-4 object-cover"
            style={{ borderColor: accent }}
          />
        )}
        {c.fullName && (
          <h1 className="text-[32px] font-extrabold leading-tight text-neutral-800">
            {c.fullName}
          </h1>
        )}
        {c.headline && (
          <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[30%] shrink-0 px-6 py-6" style={{ background: '#fdf2f8' }}>
          {resume.summary && (
            <div className="mb-7">
              <SidebarTitle>About Me</SidebarTitle>
              <p className="text-[12px] leading-relaxed text-neutral-600">{resume.summary}</p>
            </div>
          )}

          {contactBits.length > 0 && (
            <div className="mb-7">
              <SidebarTitle>Contact</SidebarTitle>
              <div className="space-y-1.5 text-[11.5px] text-neutral-600">
                {contactBits.map((b) => (
                  <p key={b.label}>
                    <span className="font-semibold text-neutral-700">{b.label}: </span>
                    {b.value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {resume.skills.length > 0 && (
            <div className="mb-7">
              <SidebarTitle>Skills</SidebarTitle>
              <ul className="space-y-1.5">
                {resume.skills.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-[12px] text-neutral-700">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.languages.length > 0 && (
            <div>
              <SidebarTitle>Languages</SidebarTitle>
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

        {/* Main */}
        <main className="flex-1 px-8 py-6">
          {resume.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Work Experience
              </h2>
              <div className="space-y-6">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[13.5px] font-extrabold uppercase tracking-wide text-neutral-800">
                      {e.role}
                      {e.company && <span className="font-medium text-neutral-600"> · {e.company}</span>}
                    </h3>
                    {(e.startDate || e.endDate || e.current) && (
                      <p className="text-[11.5px] font-medium" style={{ color: accent }}>
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

          {resume.education.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Education
              </h2>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-neutral-800">
                      {e.degree}
                    </h3>
                    <p className="text-[12px] text-neutral-600">{e.school}</p>
                    {(e.startDate || e.endDate) && (
                      <p className="text-[11.5px] text-neutral-500">
                        {e.startDate} - {e.endDate}
                      </p>
                    )}
                    {e.details && <p className="mt-0.5 text-[12px] text-neutral-600">{e.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                Projects
              </h2>
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
              <div key={sec.id} className="mb-8">
                <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                  {sec.title || 'Additional'}
                </h2>
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
