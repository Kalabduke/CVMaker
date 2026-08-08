import type { ResumeSchema } from '../types/resume'

function Rule({ accent }: { accent: string }) {
  return <div className="my-5 h-px w-full" style={{ background: accent, opacity: 0.35 }} />
}

export function MinimalTemplate({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  return (
    <div className="min-h-full bg-white px-14 py-12 text-neutral-800">
      <header className="text-center">
        {c.fullName && (
          <h1 className="text-3xl font-light uppercase tracking-[0.22em]">{c.fullName}</h1>
        )}
        {c.headline && (
          <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em]" style={{ color: accent }}>
            {c.headline}
          </p>
        )}
        <p className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px] text-neutral-500">
          {[c.email, c.phone, c.location, c.linkedin, c.github].filter(Boolean).map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </p>
      </header>

      {resume.summary && (
        <section>
          <Rule accent={accent} />
          <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Summary
          </h2>
          <p className="text-[13.5px] leading-relaxed text-neutral-600">{resume.summary}</p>
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
                  <h3 className="text-[14px] font-semibold">{e.role}</h3>
                  <span className="shrink-0 text-[11.5px] text-neutral-500">
                    {e.startDate} — {e.current ? 'Present' : e.endDate}
                  </span>
                </div>
                <p className="text-[12.5px] text-neutral-500">
                  {e.company}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                {e.bullets.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[12.5px] leading-relaxed text-neutral-600">
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
        <section>
          <Rule accent={accent} />
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
            Education
          </h2>
          <div className="space-y-4">
            {resume.education.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[13.5px] font-semibold">{e.degree}</h3>
                  <span className="shrink-0 text-[11.5px] text-neutral-500">
                    {e.startDate} — {e.endDate}
                  </span>
                </div>
                <p className="text-[12.5px] text-neutral-500">
                  {e.school}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
                {e.details && <p className="mt-1 text-[12px] text-neutral-600">{e.details}</p>}
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
                {s.name}
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
                  {p.name}
                  {p.link && <span className="ml-2 text-[11px] font-normal text-neutral-500">{p.link}</span>}
                </h3>
                {p.description && (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-600">{p.description}</p>
                )}
                {p.tech.length > 0 && (
                  <p className="mt-1 text-[11px] text-neutral-500">{p.tech.join(' · ')}</p>
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
                {l.name} <span className="text-neutral-400">· {l.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
