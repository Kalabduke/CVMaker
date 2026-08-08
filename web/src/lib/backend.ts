import type { ResumeSchema } from '../types/resume'

const COLLECTION = 'resumes'

/**
 * Persist a resume under a slug so it can be shared cross-device.
 * Firebase is lazy-loaded so it only enters the bundle when actually used;
 * falls back to localStorage when Firebase isn't configured.
 */
export async function saveResumeToBackend(resume: ResumeSchema, slug: string): Promise<string> {
  const { getDb, ensureAnonUser } = await import('./firebase')
  const db = getDb()
  if (db) {
    // Writes are gated by `request.auth != null` in the security rules,
    // so sign in anonymously first or Firestore rejects the write.
    await ensureAnonUser()
    const { doc, setDoc } = await import('firebase/firestore')
    await setDoc(doc(db, COLLECTION, slug), {
      resume,
      slug,
      updatedAt: new Date().toISOString(),
    })
    return slug
  }
  try {
    localStorage.setItem(`cvmaker:shared:${slug}`, JSON.stringify(resume))
  } catch {
    // ignore
  }
  return slug
}

/** Load a resume by slug from Firebase or localStorage fallback. */
export async function loadResumeBySlug(slug: string): Promise<ResumeSchema | null> {
  const { getDb } = await import('./firebase')
  const db = getDb()
  if (db) {
    try {
      const { doc, getDoc } = await import('firebase/firestore')
      const snap = await getDoc(doc(db, COLLECTION, slug))
      if (snap.exists()) {
        const data = snap.data()
        return (data.resume as ResumeSchema) ?? null
      }
      return null
    } catch {
      return null
    }
  }
  try {
    const raw = localStorage.getItem(`cvmaker:shared:${slug}`)
    return raw ? (JSON.parse(raw) as ResumeSchema) : null
  } catch {
    return null
  }
}
