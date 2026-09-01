/**
 * =============================================================
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this one file to update the whole portfolio.
 *  Anything marked TODO is a placeholder - replace it.
 * =============================================================
 */

export const site = {
  /* ---------- 1. IDENTITY ---------- */
  name: "Syed Ali Raza",
  shortName: "Ali Raza",
  initials: "AR",
  title: "Full Stack Developer", // TODO: confirm your title
  tagline:
    "I build data dashboards, internal tools and automations that turn messy spreadsheets into decisions teams actually trust.", // TODO
  location: "Pakistan", // TODO
  email: "hello@example.com", // TODO: the email you want public
  resumeUrl: "", // TODO: put resume.pdf in /public and set "/resume.pdf"
  avatar: "", // TODO: put photo in /public and set "/avatar.jpg" (blank = initials badge)

  /* ---------- 2. SOCIAL ---------- */
  socials: {
    github: "https://github.com/", // TODO
    linkedin: "https://linkedin.com/in/", // TODO
    x: "", // optional, leave "" to hide
  },

  /* ---------- 3. ABOUT ---------- */
  about: {
    heading: "About",
    paragraphs: [
      "I'm a developer focused on the unglamorous half of software: the pipelines, dashboards and internal tools that a business runs on every day. Most of my work starts with a team drowning in spreadsheets and ends with a single screen they check every morning.", // TODO
      "I work mainly across React, TypeScript and Node, and I'm comfortable wiring up third-party APIs, CRMs and Google Sheets into something reliable. I care a lot about data being correct, because a dashboard nobody believes is worse than no dashboard at all.", // TODO
      "Right now I'm open to full-time and freelance work. If you have a reporting or automation problem that keeps coming back, I'd like to hear about it.", // TODO
    ],
    // Small stat strip under the about text. Set to [] to hide.
    stats: [
      { value: "3+", label: "Years building" }, // TODO
      { value: "10+", label: "Projects shipped" }, // TODO
      { value: "5+", label: "APIs integrated" }, // TODO
    ],
  },

  /* ---------- 4. PROJECTS ---------- */
  projects: [
    {
      title: "Sales Pipeline Dashboard", // TODO
      blurb:
        "A live reporting dashboard that syncs CRM records into Google Sheets, derives funnel stages, and surfaces stuck deals, owner performance and data-quality gaps in one view.",
      tags: ["React", "TypeScript", "Vite", "Google Sheets API", "Vercel"],
      github: "",
      live: "",
      featured: true,
      image: "", // TODO: "/projects/dashboard.png" - blank renders a gradient card
    },
    {
      title: "CRM Sync Service", // TODO
      blurb:
        "A scheduled Node service that pulls contacts and opportunities from a CRM, normalises inconsistent field data, and writes clean, deduplicated rows downstream.",
      tags: ["Node.js", "REST APIs", "Automation", "Cron"],
      github: "",
      live: "",
      featured: true,
      image: "",
    },
    {
      title: "Project Three", // TODO
      blurb:
        "Short description of what the project does and, more importantly, what problem it solved for whoever used it.",
      tags: ["Next.js", "Tailwind CSS"],
      github: "",
      live: "",
      featured: false,
      image: "",
    },
  ],

  /* ---------- 5. SKILLS ---------- */
  skills: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"], // TODO
    },
    {
      group: "Frameworks & Libraries",
      items: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Recharts"],
    },
    {
      group: "Data & APIs",
      items: ["Google Sheets API", "REST APIs", "Webhooks", "PostgreSQL"],
    },
    {
      group: "Tools & Platforms",
      items: ["Git", "GitHub", "Vercel", "Vite", "Figma"],
    },
  ],

  /* ---------- 6. EXPERIENCE ---------- */
  // Delete entries you don't need. Set experience: [] to hide the section.
  experience: [
    {
      role: "Full Stack Developer", // TODO
      company: "Company Name",
      period: "2024 - Present",
      location: "Remote",
      points: [
        "Built and maintained an internal reporting dashboard used daily by the sales and operations teams.",
        "Automated a manual spreadsheet workflow, cutting a multi-hour weekly reporting task down to minutes.",
        "Integrated third-party CRM and Sheets APIs with retry handling and field normalisation.",
      ],
    },
    {
      role: "Previous Role", // TODO
      company: "Company Name",
      period: "2022 - 2024",
      location: "Remote",
      points: [
        "One clear outcome you delivered, with a number if you have one.",
        "Another responsibility that shows range.",
      ],
    },
  ],

  /* ---------- 7. EDUCATION ---------- */
  // Set education: [] to hide.
  education: [
    {
      degree: "BS Computer Science", // TODO
      institution: "University Name",
      period: "2018 - 2022",
    },
  ],

  /* ---------- 8. CONTACT ---------- */
  contact: {
    heading: "Let's work together",
    body:
      "I'm open to full-time roles and freelance projects. Send me a note about what you're building and I'll get back to you within a day or two.",
  },
} as const;

export type Project = (typeof site.projects)[number];
export type Experience = (typeof site.experience)[number];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
