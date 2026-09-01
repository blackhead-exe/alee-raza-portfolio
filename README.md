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

No image means the card renders a clean gradient panel, which still looks fine.

### Hiding a whole section
Set its array to empty in `site.ts`:
- `experience: []` and `education: []` hides the Experience section entirely
- `about.stats: []` hides the stat strip

If you hide a section, also delete its entry from `navLinks` at the bottom of
`site.ts` so the nav doesn't link to nothing.

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
