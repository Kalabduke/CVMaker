import type { ResumeSchema } from '../types/resume'

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2
      className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: accent }}
    >
      {children}
    </h2>
  )
}

export function ModernTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  return (
    <div className="flex min-h-full bg-white text-neutral-800">
      {/* Sidebar */}
      <aside
        className="w-[34%] shrink-0 px-6 py-8 text-white"
        style={{ background: accent }}
      >
        {c.photoUrl && (
          <img
            src={c.photoUrl}
            alt={c.fullName || 'Profile'}
            className="mb-4 h-28 w-28 rounded-full object-cover ring-2 ring-white/40"
          />
        )}
        {c.fullName && (
          <h1 className="mb-1 text-2xl font-extrabold leading-tight">{c.fullName}</h1>
        )}
        {c.headline && <p className="mb-6 text-[12px] opacity-90">{c.headline}</p>}

        {resume.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">
              Skills
            </h2>
            <ul className="space-y-1.5">
              {resume.skills.map((s) => (
                <li key={s.id} className="text-[12px]">
                  <div className="flex justify-between">
                    <span>{s.name}</span>
                    <span className="opacity-60">{'●'.repeat(s.level)}</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-white/25">
                    <div
                      className="h-1 rounded-full bg-white"
                      style={{ width: `${(s.level / 5) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resume.languages.length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">
              Languages
            </h2>
            <ul className="space-y-1 text-[12px]">
              {resume.languages.map((l) => (
                <li key={l.id}>
                  {l.name} <span className="opacity-70">· {l.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-8">
        {(c.email || c.phone || c.location || c.linkedin || c.github || c.website) && (
          <div className="mb-6 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-neutral-500">
            {c.email && <span>{c.email}</span>}
            {c.phone && <span>{c.phone}</span>}
            {c.location && <span>{c.location}</span>}
            {c.linkedin && <span>{c.linkedin}</span>}
            {c.github && <span>{c.github}</span>}
            {c.website && <span>{c.website}</span>}
          </div>
        )}

        {resume.summary && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Summary</SectionTitle>
            <p className="text-[13px] leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {resume.experience.length > 0 && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Experience</SectionTitle>
            <div className="space-y-4">
              {resume.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[13.5px] font-bold">{e.role}</h3>
                    <span className="shrink-0 text-[11px] text-neutral-500">
                      {e.startDate} — {e.current ? 'Present' : e.endDate}
                    </span>
                  </div>
                  <p className="text-[12px] font-medium" style={{ color: accent }}>
                    {e.company}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                  {e.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc pl-4 text-[12.5px] leading-relaxed text-neutral-600">
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
          <div className="mb-6">
            <SectionTitle accent={accent}>Education</SectionTitle>
            <div className="space-y-3">
              {resume.education.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[13px] font-bold">{e.degree}</h3>
                    <span className="shrink-0 text-[11px] text-neutral-500">
                      {e.startDate} — {e.endDate}
                    </span>
                  </div>
                  <p className="text-[12px] text-neutral-600">
                    {e.school}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                  {e.details && <p className="text-[12px] text-neutral-500">{e.details}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="mb-6">
            <SectionTitle accent={accent}>Projects</SectionTitle>
            <div className="space-y-3">
              {resume.projects.map((p) => (
                <div key={p.id}>
                  <h3 className="text-[13px] font-bold">
                    {p.name}
                    {p.link && (
                      <span className="ml-2 text-[11px] font-normal text-neutral-500">
                        {p.link}
                      </span>
                    )}
                  </h3>
                  {p.description && (
                    <p className="text-[12.5px] leading-relaxed text-neutral-600">
                      {p.description}
                    </p>
                  )}
                  {p.tech.length > 0 && (
                    <p className="mt-1 text-[11px] text-neutral-500">{p.tech.join(' · ')}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.custom.length > 0 && (
          <div>
            {resume.custom.map((sec) => (
              <div key={sec.id} className="mb-6">
                <SectionTitle accent={accent}>{sec.title || 'Additional'}</SectionTitle>
                <ul className="space-y-1.5">
                  {sec.items.map((it, i) => (
                    <li key={i} className="text-[12.5px] leading-relaxed text-neutral-600">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
