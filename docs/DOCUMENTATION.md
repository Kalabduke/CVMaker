# CVMaker — Documentation

**Status:** Phase 0 — scaffold (repo-ready: master file, docs, web app, template engine).
**Stack:** React + TypeScript + Vite + Tailwind v4 (web) · @react-pdf/renderer (vector PDF export) · Firebase free Spark plan (auth + Firestore backend) · Netlify (hosting) · 100% free.

---

## 1. What CVMaker is

CVMaker is a web app where anyone can build a **professional resume website** by filling out a simple guided form. It asks for the standard resume content — contact info, a short summary/description, work experience, education, skills, projects, and languages — and instantly renders it into a chosen template. The result is:

- a **live preview** while editing,
- a **shareable hosted page** (`/r/:slug`) with clean link previews,
- a **downloadable PDF** (via the browser print dialog, searchable text),
- and a **JSON backup** you can export/import anytime.

Users can also **upload an existing resume file** (PDF or DOCX) and CVMaker will pre-fill the form as best it can — they only fix what's left.

## 2. Core features (roadmap)

### Phase 1 — the editor
- Template picker (Modern / Minimal / Classic / Creative / Tech) — switching never loses data
- Guided form sections: Contact, Summary, Experience, Education, Skills, Projects, Languages, Custom
- Real-time preview pane as you type
- Autosave to localStorage + manual JSON export/import

### Phase 2 — share & export
- Shareable page at `/r/:slug` — saved to **Firebase Firestore** when configured, localStorage fallback otherwise
- **One-click vector PDF download via @react-pdf/renderer** (selectable/searchable text, no print dialog)
- Per-resume `og:title`/`og:image` so link previews look good

### Phase 3 — import
- Upload `.docx` (mammoth.js) or `.pdf` (pdf.js) → best-effort mapping into the schema

### Phase 4 — optional growth
- Firebase auth (anonymous + email), saved resume list, user template uploads, premium templates / badge removal

## 3. Project layout

```
CVMaker/
├── CVMAKER_MASTER.json       # single source of truth — update with every change
├── docs/
│   ├── ARCHITECTURE.md       # system context, components, data flow
│   └── DOCUMENTATION.md      # this file
├── netlify.toml              # Netlify build (root = web/, publish = dist)
├── README.md
└── web/                      # React + Vite + TS + Tailwind app
    └── src/
        ├── App.tsx
        ├── types/resume.ts
        ├── components/Form.tsx
        ├── templates/index.ts + *.tsx
        ├── lib/{importResume,exportPdf,storage}.ts
        └── pages/Share.tsx
```

## 4. How to run locally

```bash
cd web
npm install
npm run dev        # editor
npm run build      # production build → dist/
```

**Optional — Firebase backend:** copy `web/.env.example` to `web/.env` and fill in your Firebase project's web-app config (free Spark plan, no credit card). Without it the app still works fully using localStorage — the "Cloud saves on/off" pill in the header shows which mode you're in.

## 5. Templates

The seed set ships 5 templates (Modern, Minimal, Classic, Creative, Tech). Each is a React component in `web/src/templates/`, registered in `index.ts` with metadata (name, vibe, accent, tags). Users can send their own HTML/CSS templates — those get converted to components and added to the registry.

## 6. Monetization ideas (not implemented)

- **Free forever:** unlimited resumes on seed templates, PDF download, share links.
- **Paid (later):** premium templates, custom accents, no CVMaker badge, direct PDF without print dialog, resume scoring / AI tips.
