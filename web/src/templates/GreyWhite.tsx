import type { ResumeSchema } from '../types/resume'

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
  const c = resume.contact
  const contactBits: { label: string; value: string }[] = []
  if (c.phone) contactBits.push({ label: 'Phone', value: c.phone })
  if (c.email) contactBits.push({ label: 'Email', value: c.email })
  if (c.location) contactBits.push({ label: 'Address', value: c.location })
  if (c.website) contactBits.push({ label: 'Web', value: c.website })
  if (c.linkedin) contactBits.push({ label: 'LinkedIn', value: c.linkedin })
  if (c.github) contactBits.push({ label: 'GitHub', value: c.github })

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
        {c.fullName && (
          <h1 className="text-[30px] font-extrabold tracking-tight text-neutral-800">{c.fullName}</h1>
        )}
        {c.headline && (
          <p className="mt-1 text-[14px] font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
      </header>

      <div className="flex">
        {/* Sidebar: contact / skills / languages */}
        <aside className="w-[30%] shrink-0 bg-neutral-100 px-6 py-6">
          {contactBits.length > 0 && (
            <div className="mb-7">
              <SidebarTitle accent={accent}>Contact</SidebarTitle>
              <div className="space-y-1.5 text-[12px] text-neutral-600">
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
            <div className="mb-7">
              <SidebarTitle accent={accent}>Skills</SidebarTitle>
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
            <div>
              <SidebarTitle accent={accent}>Language</SidebarTitle>
              <ul className="space-y-1.5 text-[12px] text-neutral-600">
                {resume.languages.map((l) => (
                  <li key={l.id}>
                    <div className="flex items-center justify-between gap-2">
                      <span>{l.name}</span>
                      <span className="text-neutral-400">({l.proficiency || 'Good'})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resume.custom.length > 0 &&
            resume.custom.map((sec) => (
              <div key={sec.id} className="mt-7">
                <SidebarTitle accent={accent}>{sec.title || 'Additional'}</SidebarTitle>
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

        {/* Main: summary / education / experience / projects */}
        <main className="flex-1 px-8 py-6">
          {resume.summary && (
            <div className="mb-7">
              <MainTitle accent={accent}>Summary</MainTitle>
              <p className="text-[13px] leading-relaxed text-neutral-700">{resume.summary}</p>
            </div>
          )}

          {resume.education.length > 0 && (
            <div className="mb-7">
              <MainTitle accent={accent}>Education</MainTitle>
              <div className="space-y-4">
                {resume.education.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13px] font-bold text-neutral-800">{e.degree}</h3>
                      {(e.startDate || e.endDate) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
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
            </div>
          )}

          {resume.experience.length > 0 && (
            <div className="mb-7">
              <MainTitle accent={accent}>Experience</MainTitle>
              <div className="space-y-5">
                {resume.experience.map((e) => (
                  <div key={e.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[13.5px] font-bold text-neutral-800">{e.role}</h3>
                      {(e.startDate || e.endDate || e.current) && (
                        <span className="shrink-0 text-[11px] text-neutral-500">
                          {e.startDate} - {e.current ? 'Present' : e.endDate}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] font-medium text-neutral-600">
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
              <MainTitle accent={accent}>Projects</MainTitle>
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
