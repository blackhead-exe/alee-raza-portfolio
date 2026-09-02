/**
 * =============================================================
 *  LONG-FORM PROJECT WRITE-UPS.
 *
 *  One entry per project, keyed by the `slug` in site.ts.
 *  Each becomes its own page at /projects/<slug>.
 *
 *  A project with no entry here simply has no case study page,
 *  and its card on the home page drops the "Read case study" link.
 * =============================================================
 */

export type CaseStudy = {
  /** One or two sentences under the title on the project page. */
  intro: string;
  /** Small facts strip: role, timeline, platform, team size and so on. */
  meta: { label: string; value: string }[];
  /** The narrative. Each section is a heading plus prose and optional bullets. */
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  /** Choices worth defending, and why. This is the part engineers read. */
  decisions?: { title: string; body: string }[];
  /** Metric strip near the end. Keep these true and specific. */
  outcomes?: { value: string; label: string }[];
  /**
   * Screenshots of the real build. Scrub these before adding them:
   * no webhook URLs, no customer records, no tokens.
   */
  gallery?: { src: string; caption: string; tall?: boolean }[];
  /** Overrides the default line above the gallery. Say what the reader is looking at. */
  galleryNote?: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  /* ============================================================ */
  "insurance-crm-multi-account": {
    intro:
      "A life insurance application carries a social security number, full bank details and a complete medical history, and four separate teams touch it on the way to a funded policy. This system splits that work across four GoHighLevel sub-accounts joined entirely by webhooks, and clears the sensitive data out of the account with the largest team the moment that team stops needing it.",
    meta: [
      { label: "Role", value: "CRM systems architect" },
      { label: "Year", value: "2026" },
      // TODO: name the client here if they are happy to be named on a public site.
      { label: "Client", value: "US life insurance operation" },
      { label: "Platform", value: "GoHighLevel" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "A single insurance application collects an SSN, a bank routing and account number, a draft date, a full medication and health history, and the customer's doctor's contact details. Four separate teams touch that application on its way through: a verifier who qualifies the lead, a closer who completes the application, a validator who submits it to the carrier, and a retention team who services the policy through its first funded year.",
          "Run in one account, everyone can open any contact and read all of it, forever. That is not a permissions problem you can configure your way out of either: GoHighLevel has no field-level read restrictions for standard user roles. If a field exists on a record a user can open, that user can read it.",
          "So the separation had to be structural. Four sub-accounts with four teams and four different jobs, connected by webhooks rather than by shared access, and a rule that the largest, least-restricted team keeps the sensitive data only while it is actually completing the application.",
        ],
      },
      {
        heading: "Four accounts, one lead journey",
        paragraphs: [
          "There is no shared database. Every handoff between accounts is a webhook, and every account is a self-contained GoHighLevel sub-account with its own pipelines, fields, tags and team.",
        ],
        bullets: [
          "Verifier: no GoHighLevel login at all. They submit a public form that deduplicates on phone number and updates rather than duplicating. Submission creates the contact, assigns it to the named closer through a branch per closer, opens an opportunity at New Lead and emails that closer.",
          "Closer: a 13-stage pipeline running from New Lead through Working, Sent to Validation and Pending, out to Declined, Sent Back, Call Back Scheduled, DNC and Not Interested, and finally to Approved — Data Wiped, DNF Case or Chargeback Case.",
          "Validator: a 9-stage pipeline. The validator reviews, sends the application to head office and the carrier, then sets one field. That field is the entire control surface: Approved, Declined, Sent Back to Closer or Call Back each drive a different outcome workflow.",
          "Retention: two pipelines in one account. A retention pipeline built around a follow-up cadence, a 3-day pre-follow-up, a 7-day post-follow-up and then correspondence tracking, plus a separate funding pipeline that tracks the policy payment by payment.",
          "Central: the archive. Every account pushes a snapshot to Central on every meaningful event, so one account holds the complete history of a case even after other accounts have moved on from it.",
        ],
      },
      {
        heading: "What happens to the sensitive data",
        paragraphs: [
          "GoHighLevel cannot hide a field from a user who can open the record. So rather than pretend permissions would solve it, the system limits how long the most exposed team holds the data.",
          "The closers are the largest group, they work the widest range of records, and once an application is approved they have no further use for the applicant's SSN, bank account or medical history. So that is exactly when it goes. The approval webhook lands in the Closer account, finds the contact by phone, updates the status, moves the card to Approved — Data Wiped, pushes a final snapshot to Central, and then runs a Clear all sensitive data step that blanks the banking, social and medical fields on the record. A tag is added so the deletion itself is auditable rather than silent.",
          "From that point a closer opening the record sees a name and the word Approved. The data is not hidden from them, it is not there.",
          "The order of those steps is deliberate. Central receives the full record immediately before the wipe runs, not after, so the complete case survives in one place while the working account is stripped back. Central is not a place anyone works; it is a sealed copy that exists so the accounts people use every day do not have to be the ones holding everything.",
          "Retention receives the policy record it needs to service the customer, including the banking details the funding side of the account has to reconcile against for twelve months. That is a smaller, admin-restricted team than the closer floor, and it is the trade this design makes explicitly rather than by accident.",
        ],
      },
      {
        heading: "The validation loop",
        paragraphs: [
          "Most applications do not go straight through. A validator can decline, send back for correction, or schedule a call back, and each of those returns the lead to the closer with the context needed to act on it.",
          "Every return path fires a webhook into the Closer account which moves the card to a matching stage, fills the reason field, creates a dated task for the owning closer and emails them. The closer corrects the application and resubmits, which re-enters the Validator pipeline, clears the previous decision tags so the review starts clean, and increments a resubmission counter so rework volume is visible rather than invisible.",
        ],
      },
      {
        heading: "Retention and the funding year",
        paragraphs: [
          "An approved policy is not a closed deal. It only counts once the customer actually pays, and keeps paying for twelve months.",
          "Approval creates two opportunities in the Retention account: one in the retention pipeline, where an agent works a defined follow-up cadence, and one in a funding pipeline that tracks payment month by month. Each confirmed payment increments a month counter, advances the card one stage, records the first and last funded dates and refreshes an actively-paying tag. On the twelfth increment the funding deal completes and the retention side closes out with it.",
          "Annual premium is calculated on arrival as monthly premium times twelve, so the value of a policy is present in the account from its first day rather than worked out later.",
        ],
      },
      {
        heading: "When it goes wrong",
        paragraphs: [
          "Two failure modes needed first-class handling rather than a note in a spreadsheet: a policy that never funds at all, and a customer who pays for a few months then reverses the charge through their bank.",
          "Both set a status on the funding record, and both check that the mandatory explanation fields are filled before anything is sent onward. Once they are, an outbound webhook carries the case back to the Closer account, which opens it at a DNF Case or Chargeback Case stage with the reason, the carrier, the premium and how many months were reached. The closer who originally sold the policy is the one asked to salvage it, with the full picture in front of them.",
          "Because chargeback month counts are captured as structured data rather than free text, the operation can also see which carriers and which months carry the most risk.",
        ],
      },
    ],
    decisions: [
      {
        title: "Clearing the closer's copy instead of restricting it",
        body: "The obvious approach is to hide sensitive fields from closers through permissions. GoHighLevel does not offer field-level read restrictions for standard user roles, so that approach does not exist here. Rather than pretend otherwise, access is bounded by time: the closer has the data while they are actively completing the application, and it is cleared the moment the application is approved. The audit tag means the deletion is recorded rather than silent, so an admin can still see that values were captured and then removed rather than never taken.",
      },
      {
        title: "Central gets the full record before the wipe, not after",
        body: "Stripping data out of working accounts creates a real risk of losing the case history entirely. Sequencing the Central snapshot immediately before the clear step means the complete record lands somewhere permanent first, and only then does the working copy get cut back. It is one step ordering decision, and getting it the other way round would have quietly destroyed the archive.",
      },
      {
        title: "Mirroring field keys exactly across accounts",
        body: "GoHighLevel's Copy Contact action only transfers a custom field if the destination account has a field with the identical key and identical type. If it does not, the data is silently dropped, with no error and no warning. Field keys and types also cannot be changed after creation. That made the field schema a specification to get right before building rather than something to iterate on, so every mirror field was documented key for key and type for type before a single workflow was created.",
      },
      {
        title: "Enforcing mandatory reasons with a wait chain",
        body: "GoHighLevel cannot make a field mandatory, so a validator could decline an application and send a closer a rejection with no explanation. The decline workflow checks whether the reason is filled, waits and checks again, then raises a high-priority task assigned to that validator and pauses until the field is filled, with a timeout that escalates. The webhook to the closer only fires once a reason exists, so the constraint is enforced by the system rather than requested in a training document.",
      },
      {
        title: "Phone number as the join key",
        body: "Four sub-accounts with no shared database still need a way to agree on who a contact is. Every webhook payload carries the phone number and every receiving workflow opens with a Find Contact on it, with the intake form deduplicating on the same field and updating rather than creating. It is a deliberately boring choice, and it holds because a phone number is the one identifier this business always has and rarely changes.",
      },
      {
        title: "Deciding what happens when the contact is not there",
        body: "Every inbound webhook branches on whether Find Contact actually found something, and the two accounts answer that question differently on purpose. In the Closer account a miss ends the workflow, because a record that should already exist and does not is a signal something upstream went wrong, and inventing one would hide it. In Retention a miss creates the contact, because an approved policy arriving from the Validator is the first time that account has ever heard of this person. The branch nobody thinks about is the one that decides whether a system fails loudly or quietly.",
      },
      {
        title: "Re-entry configured per outcome, not globally",
        body: "Approval fires once per lead and re-entry is off, because approving twice would clear data twice and double-notify Retention. Decline, send back and call back all allow re-entry, because a single lead genuinely can cycle through rework several times. Getting this wrong in either direction produces either duplicate records or leads that silently stop moving, so it was decided per workflow rather than left at a default.",
      },
    ],
    outcomes: [
      { value: "4", label: "Sub-accounts" },
      { value: "4", label: "Pipelines" },
      { value: "13", label: "Closer pipeline stages" },
      { value: "12", label: "Month funding tracker" },
    ],
    gallery: [
      {
        src: "/projects/insurance/closer-approval-wipe-workflow.png",
        caption:
          "Closer account. The approval webhook lands, finds the contact by phone, and ends the run if there is no match. On the found branch it updates the status, moves the card to Approved, pushes the full record to Central, and only then clears the sensitive fields.",
      },
      {
        src: "/projects/insurance/validator-approval-fanout.png",
        caption:
          "Validator account. One field changing to Approved fans out to four destinations: the Closer account, Retention, the funding pipeline and Central.",
      },
      {
        src: "/projects/insurance/retention-inbound-workflow.png",
        caption:
          "Retention account. The same Find Contact branch resolves the other way here: no match means this is a new policy holder, so the contact is created rather than the run being abandoned.",
      },
      {
        src: "/projects/insurance/closer-pipeline-stages.png",
        caption:
          "The 13-stage Closer pipeline, including the read-only Pending stage a card is locked into while the Validator reviews, and the DNF and Chargeback stages a case returns to months later.",
      },
      {
        src: "/projects/insurance/validation-pipeline-stages.png",
        caption:
          "The Validation pipeline, from Received from Closer through carrier submission to the four decision outcomes.",
      },
      {
        src: "/projects/insurance/retention-pipeline-stages.png",
        caption:
          "The Retention pipeline, built around a follow-up cadence rather than deal stages.",
      },
      {
        src: "/projects/insurance/closer-inbound-webhook.png",
        caption:
          "An inbound webhook trigger in the Closer account, with the mapping reference showing the fields the Validator sends across.",
        tall: true,
      },
      {
        src: "/projects/insurance/retention-webhook-payload.png",
        caption:
          "The payload arriving in Retention on approval, carrying the carrier, plan, premium and the banking details the funding side reconciles against.",
        tall: true,
      },
    ],
  },

  /* ============================================================ */
  "bi-dashboard": {
    intro:
      "An internal reporting platform that takes live CRM data out of GoHighLevel, lands it somewhere a human can actually read, and renders it as a React application the sales and operations teams open every morning.",
    meta: [
      { label: "Role", value: "Sole developer" },
      { label: "Year", value: "2026" },
      { label: "Client", value: "Solid Rock Consulting" },
      { label: "Type", value: "Internal BI platform" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The team was running a multi-funnel campaign inside GoHighLevel and had no single view of it. Answering a question as basic as how many qualified leads converted this month meant opening the CRM, filtering by hand, exporting to a spreadsheet, and reconciling that against someone else's spreadsheet from the week before.",
          "Worse, the numbers people did produce were not trusted. Two people could pull the same report and disagree, usually because they had different ideas about what counted as a converted lead. Nobody could point at a source of truth, so the reporting conversation kept turning into an argument about definitions instead of a decision.",
        ],
      },
      {
        heading: "Architecture",
        paragraphs: [
          "Three moving parts, deliberately kept boring. GoHighLevel is where staff work. A sync service pulls from it on a schedule and writes everything into a Google Sheet. The dashboard reads that Sheet and never talks to the CRM directly.",
        ],
        bullets: [
          "Sync service: a Node job running as a Vercel serverless function every 15 minutes, walking 2 GHL pipelines, 325+ opportunities, contact tags and calendar events.",
          "Storage: a Google Sheet with 4 tabs. Leads and Calendar_Events are fully rewritten each run; Sync_Log is append-only, one row per run with start, finish, record count, status and any error.",
          "Frontend: a 25-route React and TypeScript application built with Vite and Tailwind, covering 4 lead funnels plus a combined cross-funnel view.",
          "A single data provider module is the only code that knows where data comes from, so swapping the Sheet for a real API later touches one file.",
        ],
      },
      {
        heading: "Deriving what the CRM does not store",
        paragraphs: [
          "A lot of what the business wanted to measure simply was not a field in GoHighLevel. The hardest part of this project was not drawing charts, it was working out what the numbers should be before drawing anything.",
        ],
        bullets: [
          "First-seen stage entry dates, so assessment acceptance and conversion could be dated rather than just observed as a current state.",
          "Tag-driven funnel placement, because contacts carry tags long before anyone remembers to move an opportunity card.",
          "A max(tag depth, stage depth) rule, so a lead is credited with the furthest point it reached by either signal instead of being quietly demoted when someone forgot to drag a card.",
          "Stuck-lead detection with per-stage thresholds, and automated data-quality checks for missing owners and company names.",
        ],
      },
      {
        heading: "What shipped",
        paragraphs: [
          "13 reusable page components parameterised across the funnels, so adding a fifth funnel is configuration rather than a rewrite, plus 8 shared components.",
        ],
        bullets: [
          "Click-to-drill-down record modals with CSV export, so any number on any chart can be opened to see the exact rows behind it.",
          "Custom date range filtering and owner filters across the funnel, operations, owners, nurture, stuck and data-quality views.",
          "An ordinal-aware chart colour system, so sequential stages read as a progression instead of arbitrary colours.",
          "A live updated-time indicator and a refresh control that genuinely re-fetches rather than just spinning.",
        ],
      },
    ],
    decisions: [
      {
        title: "A Google Sheet instead of a database",
        body: "A database would have been the default choice and the wrong one here. The Sheet is the built-in debugging tool: anyone on the team can open it in a browser and see exactly what the dashboard is working from, with no query access, no admin panel and no developer in the loop. When a number looks wrong, the argument ends in about thirty seconds. There is also no database server to host, patch or have go down at the wrong moment.",
      },
      {
        title: "Full rewrite every run, not incremental updates",
        body: "Partial updates are more efficient and much harder to trust, because they drift silently. Rewriting the whole tab every run means a failed sync is simply corrected by the next one, with no reconciliation logic and no slowly accumulating corruption. Combined with per-record failure isolation, one malformed record cannot take down an entire run.",
      },
      {
        title: "Tags over pipeline stages as the source of truth",
        body: "Pipeline stages depend on a human remembering to drag a card. Tags get applied by automation at the moment something actually happens. After comparing both signals across the real dataset, tags turned out to be substantially more reliable, so the derived funnel placement takes whichever signal is further along rather than trusting stages alone.",
      },
      {
        title: "Building BizDev records from contacts, not opportunities",
        body: "Opportunity-based reporting silently drops any lead that has not had an opportunity created yet, which is exactly the population you most want to see. Building those records from tagged contacts instead means nothing disappears. Targeted accounts and organic funnel leads are also kept as two separate populations, because merging them produces a total that looks impressive and means nothing.",
      },
      {
        title: "Fail-closed authentication at the edge",
        body: "The dashboard shows real client pipeline data, so access control could not be an afterthought or something that degrades open when a check errors. Basic Auth runs at the Vercel edge and fails closed, the sync endpoint is token-gated, and the browser only ever holds a read-only key scoped to the Sheets API.",
      },
    ],
    outcomes: [
      { value: "25", label: "Routes shipped" },
      { value: "117", label: "Vitest tests" },
      { value: "15", label: "Minute sync interval" },
      { value: "4", label: "Funnels unified" },
    ],
    galleryNote:
      "The application running against generated demo data. Every company, contact and number below is invented, so nothing here is a client record. The layout, the charts and the logic computing them are exactly what ships.",
    gallery: [
      {
        src: "/projects/dashboard/overall-dashboard.png",
        caption:
          "The combined cross-funnel view. Lead volume by source, then the Summer100 pipeline as a cumulative funnel, with targeted accounts and organic funnel leads kept as two separate populations rather than merged into one flattering total.",
      },
      {
        src: "/projects/dashboard/summer100-dashboard.png",
        caption:
          "Summer100's own dashboard: lead source split, qualification status, and the full pipeline from Dream 100 through to Converted.",
      },
      {
        src: "/projects/dashboard/overall-operations.png",
        caption:
          "Operations. Every synced record in one sortable, searchable table with source, stage and owner filters, above a qualification rate the same filters drive.",
      },
      {
        src: "/projects/dashboard/overall-data-quality.png",
        caption:
          "Data quality. Missing company names, missing owners, duplicate contacts and multiple leads per company, each carrying a severity and a drill-down to the exact rows behind it.",
      },
      {
        src: "/projects/dashboard/overall-stuck.png",
        caption:
          "Stuck leads: anything sitting past its stage threshold, with per-funnel thresholds rather than one global rule that would be wrong for most of them.",
      },
      {
        src: "/projects/dashboard/overall-owners.png",
        caption:
          "Owner performance per funnel, with the missing-owner count sitting deliberately alongside it, because an owner league table is misleading if some records have no owner at all.",
      },
      {
        src: "/projects/dashboard/overall-nurture.png",
        caption:
          "Nurture. Which of the three journeys each lead is tagged into, and whether that journey has actually produced a booking or a conversion.",
      },
      {
        src: "/projects/dashboard/wfm-navigator-dashboard.png",
        caption:
          "One of the four business development funnels. The same page components, parameterised per funnel rather than copied, which is what makes 25 routes maintainable.",
      },
    ],
  },

  /* ============================================================ */
  "summer100-bd-automation": {
    intro:
      "A complete business development system built on GoHighLevel: the pipeline, the workflows, the field schema, the QA scenarios and the rollout plan, designed so a five-person team could run it without anyone holding the whole thing in their head.",
    meta: [
      { label: "Role", value: "CRM architect" },
      { label: "Year", value: "2026" },
      { label: "Client", value: "Solid Rock Consulting" },
      { label: "Platform", value: "GoHighLevel" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "The business development effort had the shape of a process but none of the enforcement. Leads arrived from several sources, got assigned informally, and progressed or died depending on whether the person who owned them happened to follow up. There was no shared definition of what stage a deal was in and no mechanism that noticed when one went quiet.",
          "Any fix had to survive contact with a real team. A system that depends on five people remembering to do the right thing manually is not a system, so almost every rule here is enforced by automation rather than documented as a convention.",
        ],
      },
      {
        heading: "The pipeline",
        paragraphs: [
          "An 8-stage business development pipeline running from Targeted through Qualified Lead, Discovery Booked, NDA Sent, Recommendation Pitched and Proposal Sent to Closed Won or Lost, with 13 interconnected workflows driving movement between them.",
          "Underneath it sits the part that makes the pipeline mean anything: a custom field schema, a tag taxonomy that defines what each state actually is, a set of QA scenarios to test the whole thing before it touched real leads, and a phased rollout plan.",
        ],
      },
      {
        heading: "Appointment automation",
        paragraphs: [
          "Booking automation across 3 calendars: WFM Navigator, WFM Health Check and General Contact Us.",
        ],
        bullets: [
          "Confirmations on booking, plus 24-hour and 1-hour reminders.",
          "No-show recovery sequences that re-engage rather than letting the lead go cold.",
          "Internal booking notifications to the owning rep, gated by appointment-status conditions so nobody gets pinged about a cancelled slot.",
        ],
      },
      {
        heading: "Nurture and team routing",
        paragraphs: [
          "Not every lead says yes, and the ones that say not yet are worth more than most pipelines treat them as. Outcome-based nurture tracks run per product line for Not Ready, Not Interested, and Interested But Not Now.",
        ],
        bullets: [
          "Mandatory dated note logging on every touchpoint, so any contact record can be read as a chronological history rather than a current state with no memory.",
          "Round robin lead assignment across the 5-member BD team, with dual internal notifications on entry.",
          "Stale-lead escalation firing at days 7, 14 and 21.",
          "A Pause Follow Up control that suspends nurture journeys during cross-pipeline transfers, so a lead being moved does not receive a nurture email meant for a different context.",
        ],
      },
      {
        heading: "Capture and attribution",
        paragraphs: [
          "Lead capture runs through external React multi-step funnels rather than native forms, integrated with the GHL Contacts API through private integration tokens, mapping both standard and custom fields with tag-based source attribution and a calendar redirect handoff.",
          "A LinkedIn Insight Tag deployed at sub-account level with URL-based conversion tracking connects LinkedIn Ads spend directly to pipeline outcomes, so campaign performance is measured in booked discoveries rather than clicks.",
        ],
      },
    ],
    decisions: [
      {
        title: "Tag taxonomy before workflows",
        body: "It is tempting to start building workflows immediately, because that is the part that visibly does something. Defining the tag taxonomy and field schema first meant every workflow afterwards had unambiguous state to read and write, which is what kept 13 interconnected workflows from turning into a system nobody could reason about.",
      },
      {
        title: "Mandatory dated notes on every touchpoint",
        body: "Automated touchpoints usually leave no trace a human can read later. Forcing a dated note on each one costs almost nothing and turns every contact record into an audit trail, which matters enormously the first time someone asks why a lead was marked not interested four months ago.",
      },
      {
        title: "A Pause Follow Up control",
        body: "The failure mode nobody plans for is a lead receiving a nurture email while being moved between pipelines, which reads to the recipient as the company not knowing who they are. An explicit pause control makes cross-pipeline transfers safe rather than something people avoid doing.",
      },
      {
        title: "QA scenarios and a phased rollout",
        body: "Automation bugs are expensive because they are not visible: they send the wrong message to a real person and you find out later, if at all. Writing QA scenarios and rolling out in phases meant the failure modes surfaced against test contacts rather than the client's actual prospect list.",
      },
    ],
    outcomes: [
      { value: "8", label: "Pipeline stages" },
      { value: "13", label: "Interconnected workflows" },
      { value: "3", label: "Calendars automated" },
      { value: "5", label: "Reps on round robin" },
    ],
  },

  /* ============================================================ */
  "revops-scorecard": {
    intro:
      "A self-assessment quiz that does real work: it scores a prospect across four pillars, classifies how ready and how risky they are, and routes them into the right follow-up without anyone reading the submission first.",
    meta: [
      { label: "Role", value: "Automation engineer" },
      { label: "Year", value: "2025" },
      { label: "Platform", value: "GoHighLevel" },
      { label: "Type", value: "Scoring and routing engine" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Scorecard and quiz funnels usually collect a submission, email a generic PDF, and leave the sales team to work out who was actually worth calling. The signal in the answers gets thrown away at exactly the moment it is most useful.",
          "The goal here was to treat the quiz as a qualification instrument rather than a lead magnet, so that by the time a submission lands, the system already knows how to treat that contact.",
        ],
      },
      {
        heading: "Scoring model",
        paragraphs: [
          "A 4-pillar weighted quiz with answers scored A=1, B=2, C=3 and D=5 points, feeding 9 interconnected tag-triggered workflows covering submission handling, pillar weakness detection, deal risk classification, and intent and budget mapping.",
          "The raw score alone is not enough to prioritise on, so a separate priority engine composes several signals into one number.",
        ],
        bullets: [
          "Score tier contributes anywhere from +4 to +35.",
          "Growth intent and budget status adjust it up or down.",
          "Each detected pillar weakness adds +6, on the basis that a prospect who knows they have a gap is easier to help than one who does not.",
          "Revenue band shifts it, and deal killers apply a -15 penalty.",
          "The composite REVOPS_PRIORITY_SCORE then classifies the contact as High, Medium or Low.",
        ],
      },
      {
        heading: "Routing and follow-up",
        paragraphs: [
          "A 5-tier classification from Platinum through Green, Yellow and Amber to Red drives what happens next, rather than everyone receiving the same result email.",
        ],
        bullets: [
          "Tier-specific result emails matched to how ready that contact actually is.",
          "Risk escalation workflows for contacts whose answers indicate a deal in trouble.",
          "Automated task creation so a high-priority submission becomes someone's job rather than a notification.",
          "A 2-stage nurture journey with conditional booking-check exits, so anyone who books is immediately removed from the sequence.",
        ],
      },
    ],
    decisions: [
      {
        title: "Weighting D at 5 rather than 4",
        body: "An evenly spaced scale would have let a spread of mediocre answers reach the same total as one genuinely severe problem. Making the worst answer disproportionately expensive means the score reflects severity rather than averaging it away.",
      },
      {
        title: "Deal killers as a penalty, not a disqualification",
        body: "Hard-disqualifying on a single answer throws away contacts who are wrong for now rather than wrong forever. A -15 penalty pushes them down the priority list while leaving them in the nurture system, which is where they belong.",
      },
      {
        title: "Booking check as a nurture exit condition",
        body: "The most common automation failure is continuing to chase someone who already converted. Making the booking check an explicit exit at both nurture stages is a small piece of logic that prevents the single most embarrassing outcome.",
      },
    ],
    outcomes: [
      { value: "4", label: "Scored pillars" },
      { value: "9", label: "Tag-triggered workflows" },
      { value: "5", label: "Classification tiers" },
    ],
  },

  /* ============================================================ */
  "endevo-crm": {
    intro:
      "A dual-segment CRM covering B2C and B2B lead journeys in one system, where each segment gets a pipeline and an automation set shaped around how that segment actually buys.",
    meta: [
      { label: "Role", value: "CRM architect" },
      { label: "Year", value: "2025" },
      { label: "Client", value: "ENDevo" },
      { label: "Platform", value: "GoHighLevel" },
    ],
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "B2C and B2B leads were being run through the same process despite behaving nothing alike. A consumer downloading a lead magnet and a business booking a discovery call need different pacing, different messaging and different definitions of progress, and forcing both through one pipeline meant neither was served properly.",
          "Splitting them entirely into two disconnected systems would have been the easy answer and the wrong one, because the reporting and the shared automation spine still needed to work across both.",
        ],
      },
      {
        heading: "Two pipelines, one system",
        paragraphs: [
          "2 dedicated pipelines, a 5-stage B2C and a 4-stage B2B, with 14 automated workflows spanning entry through to conversion.",
        ],
        bullets: [
          "3 multi-track B2C nurture sequences: Lead Magnet, Q4 Quick Start and Q12 Analysis.",
          "Webhook-based data mapping of 27 custom fields from the external capture forms.",
          "Conditional logic gates deciding which track a contact belongs in, plus explicit cold lead routing rather than letting unresponsive contacts simply sit.",
        ],
      },
      {
        heading: "B2B booking flow",
        paragraphs: [
          "The B2B side is built around getting to a conversation and making sure it happens.",
        ],
        bullets: [
          "Slack, SMS and email notifications at booking, 24 hours out and 1 hour out.",
          "Structured cancellation and no-show handling that updates opportunity status rather than leaving a stale card in the pipeline.",
        ],
      },
    ],
    decisions: [
      {
        title: "Separate pipelines rather than one with a segment field",
        body: "A single pipeline with a B2C or B2B flag looks tidier and immediately breaks, because the stages themselves mean different things per segment. Two pipelines let each segment have honest stage names, at the cost of some duplicated workflow structure, which is the cheaper trade.",
      },
      {
        title: "Slack alongside SMS and email for B2B",
        body: "B2B booking notifications need to reach the team, not the lead. Routing those to Slack puts them where the team already works instead of adding another inbox to check.",
      },
      {
        title: "Explicit cold lead routing",
        body: "Contacts who stop responding usually just accumulate. Giving them a defined destination keeps the active pipeline honest and means the reporting reflects real momentum rather than a growing pile of leads nobody has touched in months.",
      },
    ],
    outcomes: [
      { value: "2", label: "Segment pipelines" },
      { value: "14", label: "Automated workflows" },
      { value: "27", label: "Custom fields mapped" },
    ],
  },
};
