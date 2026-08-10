import { Document, Image, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer'
import type { DocumentProps } from '@react-pdf/renderer'
import { createRoot } from 'react-dom/client'
import { toPng } from 'html-to-image'
import type { ComponentType, ReactElement } from 'react'
import type { ResumeSchema } from '../types/resume'
import { getTemplate } from '../templates'

/* ============================================================
   Vector fallback (used if DOM capture fails)
   ============================================================ */

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    lineHeight: 1.45,
    color: '#1a1a1a',
    fontFamily: 'Helvetica',
  },
  header: { marginBottom: 14, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerText: { flex: 1 },
  photo: { width: 72, height: 72, borderRadius: 36, objectFit: 'cover' },
  name: { fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
  headline: { fontSize: 12, color: '#4a4a4a', marginTop: 3 },
  contactRow: { marginTop: 6, fontSize: 9, color: '#555', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    paddingBottom: 3,
    marginBottom: 7,
  },
  item: { marginBottom: 8 },
  itemHeader: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  itemTitle: { fontSize: 10.5, fontWeight: 'bold' },
  itemDate: { fontSize: 9, color: '#666' },
  itemSub: { fontSize: 9.5, color: '#444', marginTop: 1 },
  bullets: { marginTop: 3, paddingLeft: 12 },
  bullet: { fontSize: 9.5, color: '#333', marginBottom: 2 },
  chipsRow: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: {
    fontSize: 9,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: '#333',
  },
})

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>
}

export function ResumePdf({ resume, accent }: { resume: ResumeSchema; accent: string }) {
  const c = resume.contact
  const contactItems = [c.email, c.phone, c.location, c.linkedin, c.github, c.website].filter(Boolean)

  return (
    <Document
      title={`${c.fullName || 'Resume'} — CV`}
      author={c.fullName || 'CVMaker'}
      creator="CVMaker"
      producer="CVMaker"
      subject={`Resume of ${c.fullName || 'candidate'}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            {c.fullName && <Text style={[styles.name, { color: accent }]}>{c.fullName}</Text>}
            {c.headline && <Text style={styles.headline}>{c.headline}</Text>}
            {contactItems.length > 0 && (
              <View style={styles.contactRow}>
                {contactItems.map((item, i) => (
                  <Text key={i} style={{ fontSize: 9 }}>
                    {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
          {c.photoUrl && <Image src={c.photoUrl} style={styles.photo} />}
        </View>

        {resume.summary && (
          <View style={styles.section}>
            <SectionTitle>Summary</SectionTitle>
            <Text style={{ fontSize: 10, color: '#333' }}>{resume.summary}</Text>
          </View>
        )}

        {resume.experience.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Experience</SectionTitle>
            {resume.experience.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{e.role}</Text>
                  <Text style={styles.itemDate}>
                    {e.startDate} — {e.current ? 'Present' : e.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSub}>
                  {e.company}
                  {e.location ? ` · ${e.location}` : ''}
                </Text>
                {e.bullets.length > 0 && (
                  <View style={styles.bullets}>
                    {e.bullets.map((b, i) => (
                      <Text key={i} style={styles.bullet}>
                        • {b}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {resume.education.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Education</SectionTitle>
            {resume.education.map((e) => (
              <View key={e.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{e.degree}</Text>
                  <Text style={styles.itemDate}>
                    {e.startDate} — {e.endDate}
                  </Text>
                </View>
                <Text style={styles.itemSub}>
                  {e.school}
                  {e.location ? ` · ${e.location}` : ''}
                </Text>
                {e.details && <Text style={{ fontSize: 9.5, color: '#555', marginTop: 1 }}>{e.details}</Text>}
              </View>
            ))}
          </View>
        )}

        {resume.skills.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Skills</SectionTitle>
            <View style={styles.chipsRow}>
              {resume.skills.map((s) => (
                <Text key={s.id} style={styles.chip}>
                  {s.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {resume.projects.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Projects</SectionTitle>
            {resume.projects.map((p) => (
              <View key={p.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{p.name}</Text>
                  {p.link ? <Text style={styles.itemDate}>{p.link}</Text> : null}
                </View>
                {p.description && <Text style={{ fontSize: 9.5, color: '#333', marginTop: 2 }}>{p.description}</Text>}
                {p.tech.length > 0 && (
                  <Text style={{ fontSize: 8.5, color: '#666', marginTop: 2 }}>{p.tech.join(' · ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resume.languages.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Languages</SectionTitle>
            <View style={styles.chipsRow}>
              {resume.languages.map((l) => (
                <Text key={l.id} style={styles.chip}>
                  {l.name} · {l.proficiency}
                </Text>
              ))}
            </View>
          </View>
        )}

        {resume.custom.length > 0 &&
          resume.custom.map((sec) => (
            <View key={sec.id} style={styles.section}>
              <SectionTitle>{sec.title || 'Additional'}</SectionTitle>
              {sec.items.map((it, i) => (
                <Text key={i} style={styles.bullet}>
                  • {it}
                </Text>
              ))}
            </View>
          ))}
      </Page>
    </Document>
  )
}

/* ============================================================
   Selected-template capture: render the real template off-screen,
   screenshot it, and slice it into A4 pages for the PDF.
   ============================================================ */

const A4_WIDTH_PX = 794 // A4 @ 96dpi
const A4_HEIGHT_PX = 1123
const CAPTURE_SCALE = 2 // retina-crisp slices

/** Renders the chosen template off-screen and returns A4-sized PNG slices. */
async function captureTemplateSlices(
  resume: ResumeSchema,
  accent: string,
  Component: ComponentType<{ resume: ResumeSchema; accent: string }>
): Promise<string[] | null> {
  const host = document.createElement('div')
  host.style.cssText = `position:fixed;top:0;left:-10000px;width:${A4_WIDTH_PX}px;background:#fff;z-index:-1;pointer-events:none;`
  host.setAttribute('aria-hidden', 'true')
  document.body.appendChild(host)

  let root: ReturnType<typeof createRoot> | null = null
  try {
    root = createRoot(host)
    root.render(<Component resume={resume} accent={accent} />)

    // Give React, fonts and images time to settle before capturing.
    await document.fonts?.ready.catch?.(() => {})
    const imgs = [...host.querySelectorAll('img')]
    await Promise.all(imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r }))))
    await new Promise((r) => setTimeout(r, 300))

    // If a photo was supposed to render but failed to load (e.g. remote URL
    // without CORS), fall back to the vector PDF rather than shipping a blank.
    if (imgs.some((img) => img.hasAttribute('src') && img.complete && img.naturalWidth === 0)) {
      return null
    }

    const el = host.firstElementChild as HTMLElement
    const fullHeight = el.offsetHeight
    if (!fullHeight) return null

    const dataUrl = await toPng(el, {
      pixelRatio: CAPTURE_SCALE,
      backgroundColor: '#ffffff',
      cacheBust: true,
      width: A4_WIDTH_PX,
      height: fullHeight,
      style: { margin: '0' },
    })

    // DOM image (avoid name clash with react-pdf's <Image> component)
    const img = document.createElement('img')
    img.src = dataUrl
    await img.decode()

    const src = document.createElement('canvas')
    src.width = img.naturalWidth
    src.height = img.naturalHeight
    src.getContext('2d')!.drawImage(img, 0, 0)

    const pageH = A4_HEIGHT_PX * CAPTURE_SCALE
    const slices: string[] = []
    for (let y = 0; y < src.height; y += pageH) {
      const h = Math.min(pageH, src.height - y)
      const slice = document.createElement('canvas')
      slice.width = src.width
      slice.height = h
      slice.getContext('2d')!.drawImage(src, 0, y, src.width, h, 0, 0, src.width, h)
      slices.push(slice.toDataURL('image/png'))
    }
    return slices.length ? slices : null
  } catch (err) {
    console.warn('[CVMaker] template capture failed, falling back to vector PDF:', err)
    return null
  } finally {
    root?.unmount()
    host.remove()
  }
}

/** One full-bleed page per slice — exact match to what the user sees. */
function SlicedPdf({ slices, resume }: { slices: string[]; resume: ResumeSchema }) {
  const c = resume.contact
  return (
    <Document
      title={`${c.fullName || 'Resume'} — CV`}
      author={c.fullName || 'CVMaker'}
      creator="CVMaker"
      producer="CVMaker"
      subject={`Resume of ${c.fullName || 'candidate'}`}
    >
      {slices.map((src, i) => (
        <Page key={i} size="A4" style={{ margin: 0, padding: 0 }}>
          <Image src={src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
        </Page>
      ))}
    </Document>
  )
}

/** Render the chosen template to a PDF blob (falls back to the vector layout). */
export async function buildTemplatePdf(resume: ResumeSchema, accent: string, templateId: string): Promise<Blob> {
  // getTemplate never returns undefined (falls back to minimal), so no null-check needed.
  const template = getTemplate(templateId)
  const slices = await captureTemplateSlices(resume, accent, template.Component)

  const doc: ReactElement<DocumentProps> =
    slices && slices.length ? (
      <SlicedPdf slices={slices} resume={resume} />
    ) : (
      <ResumePdf resume={resume} accent={accent} />
    )

  return pdf(doc).toBlob()
}

/** Build the PDF for the selected template and trigger a one-click download. */
export async function downloadResumePdf(resume: ResumeSchema, accent: string, templateId: string): Promise<void> {
  const blob = await buildTemplatePdf(resume, accent, templateId)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(resume.contact.fullName || 'resume').replace(/[^a-z0-9]+/gi, '-')}.pdf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
