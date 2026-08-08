import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

/** True only when a real Firebase config is present (not placeholder). */
export const firebaseReady = Boolean(
  config.apiKey && config.projectId && !config.apiKey.includes('your_'),
)

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

function ensureInit(): void {
  if (!firebaseReady || app) return
  app = initializeApp(config)
  auth = getAuth(app)
  db = getFirestore(app)
}

export function getDb(): Firestore | null {
  ensureInit()
  return db
}

/** Sign in anonymously so users can save resumes without an account. */
export async function ensureAnonUser(): Promise<string | null> {
  if (!firebaseReady) return null
  ensureInit()
  if (!auth) return null
  if (!auth.currentUser) await signInAnonymously(auth)
  return auth.currentUser?.uid ?? null
}
