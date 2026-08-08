# CVMaker

Turn a simple form into a beautiful, shareable CV website — free.

Fill in a guided form (contact, summary, experience, education, skills, projects, languages), pick a template, and CVMaker renders a professional resume website with a live preview, a shareable hosted page (`/r/:slug`), and a downloadable PDF. You can also upload an existing resume (PDF/DOCX) to pre-fill the form.

## Stack

- **Web:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Hosting:** Netlify (free) — auto-deploy from GitHub `main`
- **Storage:** localStorage autosave + JSON export/import (Supabase optional later)

## Quick start

```bash
cd web
npm install
npm run dev
```

## Docs

- `CVMAKER_MASTER.json` — single source of truth for the project (read this first)
- `docs/ARCHITECTURE.md` — system context, components, data flow
- `docs/DOCUMENTATION.md` — full documentation

## Templates

Ships with 5 seed templates (Modern, Minimal, Classic, Creative, Tech), each a React component in `web/src/templates/`. User-supplied templates are converted to components and added to the registry.
