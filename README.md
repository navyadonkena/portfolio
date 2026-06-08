# Navya Donkena — Portfolio

A single-page, self-contained portfolio site. No build step, no dependencies — just one `index.html`.

## View it
Double-click `index.html`, or run a local server from this folder:
```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy (any of these)
- **GitHub Pages:** push this folder to a repo, Settings → Pages → deploy from `main` / root.
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the folder, or connect the repo. No build command needed.

## Edit
Everything lives in `index.html` (HTML + CSS + a little JS, all inline). Common edits:
- **Hero headline / stats:** the `.hero` section near the top of `<body>`.
- **Client logos:** the `.logo-row` block.
- **Results numbers:** the `.results` grid.
- **Tools:** the `.tools` grid (CiteReady, CROAnalyzer, Claude automations).
- **Experience / About:** the `#experience` and `#about` sections.
- **Contact:** email/phone in the `.cta-band` and footer.

## To fill in / confirm
- **LinkedIn URL** — not included yet; add a link in the nav/footer once you have it.
- **Profile photo** — optional; can be added to the hero or About.
- **Client metrics** — pulled from your resume. Double-check anything NDA-sensitive before publishing publicly.

## Files
- `index.html` — the site.
- `_backup-alexchen-template.html` — the unrelated demo template that was in this folder before; kept as a backup, safe to delete.
