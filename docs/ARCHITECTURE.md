# CVMaker — Architecture

A guided form turns a user's answers into a beautiful, shareable CV website. React web app, Netlify hosting, free tier.

---

## 1. System context

```
   User uploads existing            User fills guided form
   resume (PDF/DOCX)               (contact, summary, experience,
        │                               education, skills, ...)
        ▼                                   ▼
   Import parser ──► best-effort ──► ResumeSchema (typed, plain JSON)
        │                                │
        └───────────────┬────────────────┘
                        ▼
              Template engine (id → React component)
                        │
          ┌─────────────┼──────────────┐
          ▼             ▼              ▼
   Live preview    Share page      PDF export
   (edit pane)     /r/:slug        (window.print + @media print)
                        │
                        ▼
                localStorage autosave
                + export/import JSON
                + Firebase cloud save (anonymous auth + Firestore)
```

## 2. Components

| Piece | File | Role |
|---|---|---|
| App shell | `web/src/App.tsx` | two-pane editor: form left, live preview right |
| Resume schema | `web/src/types/resume.ts` | typed shape of all resume data (single source of truth) |
| Form | `web/src/components/Form.tsx` | guided sections, autosave to localStorage |
| Template engine | `web/src/templates/index.ts` | id → component registry + metadata (name, vibe, accent, tags) |
| Seed templates | `web/src/templates/*.tsx` | Modern / Minimal / Classic / Creative / Tech |
| Import parser | `web/src/lib/importResume.ts` | mammoth.js (.docx) + pdf.js (.pdf) → best-effort schema fill |
| Export | `web/src/lib/exportPdf.ts` | triggers print dialog with print stylesheets |
| Share page | `web/src/pages/Share.tsx` | reads /r/:slug from localStorage or Supabase, renders template |
| Storage | `web/src/lib/storage.ts` | localStorage autosave + JSON export/import |
| Backend | `web/src/lib/firebase.ts` + `backend.ts` | Firebase init (env-based, graceful fallback), anonymous auth, Firestore save/load by slug |
| PDF export | `web/src/lib/pdf.ts` | @react-pdf/renderer vector document + one-click download (no print dialog) |
| Share page | `web/src/pages/Share.tsx` | renders `/r/:slug` from Firestore or localStorage |

## 3. Data flow

1. User picks a template (switching never clears data — schema is template-agnostic).
2. Form writes into a single `ResumeSchema` object; every change re-renders the preview.
3. Optionally, the user uploads an existing PDF/DOCX → import parser fills what it can.
4. "Share" publishes to `/r/:slug`; "Download PDF" opens the print dialog with `@media print` rules that hide the editor chrome.
5. All data autosaves locally; JSON export/import is the portable backup.

## 4. PDF export strategy

- **Primary:** `@react-pdf/renderer` — the resume renders into a true vector PDF (selectable/searchable text, small file) entirely client-side, and downloads one-click with no print dialog. The PDF layout mirrors the resume schema (see `web/src/lib/pdf.ts`).
- **Not used:** `window.print()` (print dialog dependency) and html2canvas/jsPDF (rasterized text) — kept only as documented fallbacks.

## 5. Backend (Firebase, free Spark plan)

- **Anonymous auth** (`signInAnonymously`) — users can save resumes without creating an account.
- **Firestore collection `resumes`** keyed by share slug: `{ resume, slug, updatedAt }`.
- **Config via `web/.env`** (see `web/.env.example`). When unconfigured, the app silently falls back to localStorage so it still works with zero setup.

## 6. Template authoring

- Each template is a React component receiving `ResumeSchema` + an accent color.
- New user-supplied templates are converted to a component and registered in `web/src/templates/index.ts`.
- Print styles live per-template (`@media print`) so PDFs look intentional on every template.
