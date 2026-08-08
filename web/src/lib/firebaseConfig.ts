/** True only when a real Firebase config is present (not placeholder). */
export const firebaseReady = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    !String(import.meta.env.VITE_FIREBASE_API_KEY).includes('your_'),
)
