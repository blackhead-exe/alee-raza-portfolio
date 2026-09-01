# Syed Ali Raza - Portfolio

Personal portfolio site. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
Deploys to **https://alee-raza.vercel.app**

---

## Editing the site

**Almost everything you'll want to change lives in one file:**

```
src/content/site.ts
```

Name, title, tagline, email, socials, about text, projects, skills, experience,
education and the contact blurb are all there. Anything marked `// TODO` is a
placeholder waiting for your real content. The components read from this file,
so you never have to touch JSX to update text.

### Adding your photo
1. Drop the image into `public/` (e.g. `public/avatar.jpg`)
2. In `site.ts` set `avatar: "/avatar.jpg"`

Leave `avatar: ""` and the hero shows an initials badge instead.

### Adding your resume
1. Drop the PDF into `public/` (e.g. `public/resume.pdf`)
2. In `site.ts` set `resumeUrl: "/resume.pdf"`

A Resume button appears in the hero automatically. Leave it `""` to hide it.

### Adding project screenshots
1. Drop images into `public/projects/` (e.g. `public/projects/dashboard.png`)
2. On that project set `image: "/projects/dashboard.png"`

No image means the card simply has no image panel, which looks fine too.

### Project fields
Each project takes `title`, `period`, `blurb`, `highlights` (the bullet list),
`tags`, `github`, `live`, `featured` (shows a Featured pill) and `image`.
Set `highlights: []` if you want a short card with no bullets.

### Hiding a whole section
Set its array to empty in `site.ts`:
- `experience: []` and `education: []` hides the Experience section entirely
- `about.stats: []` hides the stat strip

If you hide a section, also delete its entry from `navLinks` at the bottom of
`site.ts` so the nav doesn't link to nothing.

### Project case study pages

Each project can have its own page at `/projects/<slug>`. The card on the home
page then links to it with a "Read case study" prompt.

Card content lives in `src/content/site.ts`. The long write-up lives in:

```
src/content/caseStudies.ts
```

keyed by the project's `slug`. Each entry takes:

| Field | What it is |
|---|---|
| `intro` | One or two sentences under the page title |
| `meta` | The facts strip: role, year, client, platform |
| `sections` | The narrative. Each has a `heading`, `paragraphs`, optional `bullets` |
| `decisions` | Optional. Choices worth defending, with the reasoning |
| `outcomes` | Optional. The metric strip near the end |

A project with no entry in `caseStudies.ts` simply has no page, and its card
drops the case study link. Pages are statically generated and added to
`sitemap.xml` automatically, so nothing else needs updating when you add one.

### Adding a whole new project
1. Add an entry to `projects` in `src/content/site.ts` with a unique `slug`
   and a `visual` of `sync`, `pipeline`, `scoring` or `funnels`
2. Optionally add a matching entry to `src/content/caseStudies.ts`

### Changing the colour
One line in `src/app/globals.css`:

```css
--color-accent: #2563eb;
```

Change it and buttons, links, badges and highlights all follow.

---

## Running locally

```bash
npm install     # first time only
npm run dev     # http://localhost:3000
npm run build   # production build, run this before deploying
npm run lint
```

---

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com, **Add New > Project**, import that repo.
3. Vercel auto-detects Next.js. Don't change any build settings.
4. Under **Project Name**, set it to `alee-raza` so the URL becomes
   `alee-raza.vercel.app`.
5. Deploy.

After that, every `git push` to `main` redeploys automatically.

### If you add a custom domain later
Update `siteUrl` in `src/app/layout.tsx`. That one constant feeds the metadata,
`robots.txt` and `sitemap.xml`.

---

## Structure

```
src/
  app/
    layout.tsx      SEO metadata, fonts, JSON-LD person schema, siteUrl
    page.tsx        section order
    globals.css     colour tokens and base styles
    sitemap.ts      auto-generated sitemap.xml
    robots.ts       auto-generated robots.txt
  components/       one file per section, plus Nav, Footer, Reveal, Icons
  content/
    site.ts         ALL COPY LIVES HERE
public/             images, resume, favicon
```
