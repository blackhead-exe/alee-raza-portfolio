/**
 * =============================================================
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this one file to update the whole portfolio.
 *  Everything below comes from your CV. The few things that
 *  weren't on it are marked with TODO.
 * =============================================================
 */

export const site = {
  /* ---------- 1. IDENTITY ---------- */
  name: "Syed Ali Raza",
  shortName: "Ali Raza",
  initials: "AR",
  title: "AI Automation & GHL Systems Engineer",
  // Cycled one at a time under your name in the hero. First one shows
  // statically for visitors who have reduced motion turned on.
  roles: [
    "AI Automation Engineer",
    "GHL Systems Engineer",
    "CRM Architect",
    "Funnel & Workflow Designer",
  ],
  tagline:
    "I architect CRM systems that run themselves. Pipelines, automation workflows, lead scoring and the reporting layer on top, built so a sales team stops chasing spreadsheets and starts trusting one screen.",
  location: "Bahawalpur, Pakistan",
  email: "aleehassan4286@outlook.com",

  // TODO: your CV PDF also carries your phone number and home address, so it is
  // deliberately not published here. Strip those, save it as public/resume.pdf,
  // set this to "/resume.pdf" and a Resume button appears in the hero.
  resumeUrl: "",

  // TODO: put a photo in /public and set this to "/avatar.jpg".
  // Left blank, the hero shows a clean initials badge instead.
  avatar: "",

  /* ---------- 2. SOCIAL ---------- */
  socials: {
    github: "https://github.com/blackhead-exe",
    linkedin: "https://linkedin.com/in/ali-raza-3b1705247",
    x: "",
  },

  /* ---------- 3. ABOUT ---------- */
  about: {
    heading: "About",
    paragraphs: [
      "I am an automation-focused CRM and funnel specialist. Most of my work is designing end-to-end customer acquisition systems in GoHighLevel: structured pipelines, multi-channel workflows, lead scoring, and funnels that connect marketing, sales and communication into one flow from lead capture through to closing and retention.",
      "I approach it as systems engineering rather than campaign setup. That means conditional logic gates, error-handling workflows for failed messages and bounced emails, audit-visible note logging on every touchpoint, and escalation rules for leads going stale, so the system keeps working when something inevitably breaks.",
      "Alongside the automation I build the reporting layer that proves it worked. The BI dashboard I built for Solid Rock Consulting syncs live CRM data into Google Sheets on a schedule and renders it as a React and TypeScript application, with the calculation layer covered by automated tests, because numbers nobody believes are worse than no numbers at all.",
      "My background is Data Science, which is where the bias toward measurable outcomes comes from. I am open to full-time roles and freelance work on CRM architecture, automation and internal tooling.",
    ],
    stats: [
      { value: "5", label: "CRM systems architected" },
      { value: "56", label: "Automation workflows built" },
      { value: "117", label: "Automated tests written" },
    ],
  },

  /* ---------- 4. PROJECTS ---------- */
  projects: [
    {
      title: "Multi-Account Insurance CRM",
      visual: "accounts",
      slug: "insurance-crm-multi-account",
      period: "2026",
      blurb:
        "A four sub-account GoHighLevel system for a US life insurance operation, where a lead moves from Closer to Validator to Retention entirely through webhooks, and sensitive data is destroyed the moment a team no longer needs it.",
      highlights: [
        "On approval the system nulls 11 sensitive fields from the Closer account, the full SSN, banking and medical set, and stamps a sensitive-data-wiped audit tag, because GoHighLevel has no field-level read restrictions for standard user roles.",
        "Each approval fires three outbound webhooks carrying three deliberately different payloads, so Retention and Funding only ever receive the fields their job needs and SSN, banking and medical data never enter those accounts at all.",
        "37 pipeline stages across 4 pipelines, 20 workflows and 31 tags, with every cross-account handoff built on inbound and outbound webhooks joined on phone number rather than a shared database.",
        "A 12-month funding tracker that auto-increments and advances stage on each confirmed payment, plus DNF and chargeback paths that route the case back to the original closer with the reason attached.",
      ],
      tags: [
        "GoHighLevel",
        "CRM Architecture",
        "Webhooks",
        "Data Minimisation",
        "Multi-Account Systems",
        "Insurance",
      ],
      github: "",
      live: "",
      featured: true,
      image: "",
    },
    {
      title: "Solid Rock Consulting BI Dashboard",
      visual: "sync",
      slug: "bi-dashboard",
      period: "2026",
      blurb:
        "An internal business intelligence platform that syncs live GoHighLevel CRM data into Google Sheets and renders it as a 25-route React application covering four lead funnels plus a combined cross-funnel view.",
      highlights: [
        "Unattended sync running as a Vercel serverless function every 15 minutes across 2 GHL pipelines, 325+ opportunities, contact tags and calendar events into 4 Sheet tabs, using full-tab rewrites for self-healing runs, per-record failure isolation and an append-only audit log.",
        "Derived the business logic GHL does not store: first-seen stage entry dates, tag-driven funnel placement, and a max(tag depth, stage depth) rule, after establishing that contact tags were a more reliable signal than manually moved pipeline stages.",
        "13 reusable page components parameterised across funnels and 8 shared components, including click-to-drill-down record modals with CSV export and custom date range filtering.",
        "Fail-closed Basic Auth at the Vercel edge, a token-gated sync endpoint and a read-only Sheets-scoped key, with 117 Vitest tests covering the pure calculation layer.",
      ],
      tags: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Recharts",
        "Node.js",
        "Google Sheets API",
        "GHL API",
        "Vercel",
      ],
      github: "",
      live: "",
      featured: true,
      image: "",
    },
    {
      title: "Summer100 CRM & Business Development Automation",
      visual: "pipeline",
      slug: "summer100-bd-automation",
      period: "2026",
      blurb:
        "A complete business development system for Solid Rock Consulting on GoHighLevel: an 8-stage pipeline from Targeted through to Closed Won or Lost, backed by 13 interconnected workflows, a custom field schema, tag taxonomy, QA scenarios and a phased rollout plan.",
      highlights: [
        "Appointment automation across 3 calendars covering confirmations, 24-hour and 1-hour reminders, no-show recovery and internal booking notifications gated by appointment-status conditions.",
        "Outcome-based nurture tracks per product line (Not Ready, Not Interested, Interested But Not Now) with mandatory dated note logging on every touchpoint for full contact-level audit visibility.",
        "Round robin lead assignment across a 5-member BD team, stale-lead escalation at days 7, 14 and 21, and a Pause Follow Up control to suspend nurture journeys during cross-pipeline transfers.",
        "External React multi-step lead capture funnels integrated with the GHL Contacts API via private integration tokens, plus a LinkedIn Insight Tag deployment tying ad spend to pipeline outcomes.",
      ],
      tags: [
        "GoHighLevel",
        "CRM Architecture",
        "React",
        "REST APIs",
        "LinkedIn Ads",
      ],
      github: "",
      live: "",
      featured: true,
      image: "",
    },
    {
      title: "RevOps Readiness Scorecard",
      visual: "scoring",
      slug: "revops-scorecard",
      period: "2025",
      blurb:
        "A scoring and automation engine built around a 4-pillar weighted quiz, feeding 9 interconnected tag-triggered workflows that handle submission, pillar weakness detection, deal risk classification and intent mapping.",
      highlights: [
        "Multi-factor priority engine calculating a REVOPS_PRIORITY_SCORE from score tier, growth intent, budget status, pillar weaknesses and deal killer penalties, classifying every contact as High, Medium or Low.",
        "5-tier classification from Platinum to Red with tier-specific emails, risk escalation workflows, automated task creation and a 2-stage nurture journey with conditional booking-check exits.",
      ],
      tags: [
        "GoHighLevel",
        "Lead Scoring",
        "Conditional Logic",
        "Email Automation",
      ],
      github: "",
      live: "",
      featured: false,
      image: "",
    },
    {
      title: "ENDevo CRM System",
      visual: "funnels",
      slug: "endevo-crm",
      period: "2025",
      blurb:
        "A dual-segment CRM covering both B2C and B2B lead journeys, with 2 dedicated pipelines and 14 automated workflows spanning entry through to conversion.",
      highlights: [
        "3 multi-track B2C nurture sequences with webhook-based data mapping of 27 custom fields, conditional logic gates and cold lead routing.",
        "B2B booking automation with Slack, SMS and email notifications at booking, 24 hours and 1 hour out, plus structured cancellation and no-show handling with opportunity status updates.",
      ],
      tags: ["GoHighLevel", "Webhooks", "Slack", "SMS & Email Automation"],
      github: "",
      live: "",
      featured: false,
      image: "",
    },
  ],

  /* ---------- 5. SKILLS ---------- */
  skills: [
    {
      group: "CRM & Automation",
      items: [
        "GoHighLevel",
        "CRM Architecture",
        "Pipeline Optimization",
        "Workflow Automation",
        "Lead Scoring & Segmentation",
        "Appointment Automation",
      ],
    },
    {
      group: "Funnels & Growth",
      items: [
        "Sales Funnel Design",
        "Conversion Optimization",
        "Customer Journey Mapping",
        "Email & SMS Automation",
        "AI Chatbot Workflows",
        "LinkedIn Ads Tracking",
      ],
    },
    {
      group: "Engineering",
      items: [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Tailwind CSS",
        "Recharts",
        "Vite",
        "Vitest",
      ],
    },
    {
      group: "Data & Integrations",
      items: [
        "Google Sheets API",
        "GHL API",
        "REST APIs",
        "Webhooks",
        "Serverless Functions",
        "Vercel",
      ],
    },
  ],

  /* ---------- 6. EXPERIENCE ---------- */
  experience: [
    {
      role: "CRM & AI Automation Engineer",
      // TODO: name the company here if you would rather have it on the site.
      company: "Freelance / Contract",
      period: "2025 - Present",
      location: "Remote",
      points: [
        "Designed and deployed end-to-end funnel systems including landing pages, survey funnels and booking workflows, improving lead capture structure and user flow consistency.",
        "Built and optimised multi-stage CRM pipelines from Lead through Booked, No-Show and Closed, giving the sales cycle proper tracking and conversion visibility.",
        "Developed automated email and SMS communication systems for confirmations, reminders, follow-ups and re-engagement, cutting manual intervention.",
        "Implemented lead scoring frameworks using conditional logic and custom fields to prioritise high-intent prospects and improve response efficiency.",
        "Engineered error-handling workflows for failed messages, bounced emails and inactive leads, keeping the system running and the data accurate.",
      ],
    },
  ],

  /* ---------- 7. EDUCATION ---------- */
  education: [
    {
      degree: "BS Data Science",
      institution: "Islamia University of Bahawalpur",
      period: "2022 - 2026",
    },
  ] as ReadonlyArray<{ degree: string; institution: string; period: string }>,

  /* ---------- 8. CONTACT ---------- */
  contact: {
    heading: "Let's build a system that runs itself",
    body:
      "I am open to full-time roles and freelance projects, especially CRM architecture, GoHighLevel builds, automation rescues and the reporting layer that proves any of it worked. Tell me what is breaking and I will tell you how I would fix it.",
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
