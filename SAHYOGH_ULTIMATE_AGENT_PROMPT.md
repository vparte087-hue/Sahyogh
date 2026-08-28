# SAHYOGH — Master Build Prompt for AI Coding Agent

You are an AI software engineer building **Sahyogh**, a cooperative-owned digital
service marketplace that connects consumers with verified skilled workers
belonging to Labour Cooperative Societies and Federations.

Do not treat this as a generic marketplace/dashboard clone. This product exists
to give underutilized cooperative workers (electricians, plumbers, carpenters,
painters, cleaners, caregivers, drivers, gardeners, technicians) a structured
digital channel to reach households — while keeping the **Cooperative
Administrator** at the center of every worker assignment. The platform never
fully automates assignment; it recommends, a human decides.

```
Consumer → Platform → Cooperative Administrator → Verified Worker
```

---

## 1. Read Before Coding

Before writing any code, internalize this entire document, then inspect the
actual repository state. Do not assume files, libraries, backend endpoints, or
services exist just because they're mentioned here — verify against the real
codebase first.

If a referenced doc (README, TECH_SPEC, ARCHITECTURE) doesn't exist yet in the
repo, say so instead of inventing its contents.

---

## 2. Tech Stack (locked, confirmed against TECH_SPEC.md)

- **Framework:** Next.js (App Router), **TypeScript** throughout — no plain
  `.js`/`.jsx` files.
- **PWA:** Consumer and Worker experiences must be built as installable PWAs
  (manifest, service worker, offline-assisted caching) — this is a confirmed
  requirement (TECH_SPEC §1), not optional polish. Admin is a standard web
  dashboard, not required to be a PWA.
- **Styling:** Tailwind CSS, using the design tokens in Section 4 — never
  hardcode raw hex values in components; extend `tailwind.config` with the
  palette and reference tokens by name.
- **Data/state layer:** **TanStack Query (React Query)** for all server state
  (requests, jobs, worker lists, notifications) + **Zustand** for small pieces
  of local/UI state (active filters, modal state, multi-step form state). Do
  not reach for Redux — it's unnecessary overhead for this scope.
- **Backend:** owned and developed separately by another engineer/team, built
  as a **REST API** (Node.js/NestJS or modular Express, PostgreSQL via Prisma,
  per TECH_SPEC §1) — not GraphQL, not Supabase client SDK. This agent is
  **frontend-only** — do not write backend code, migrations, or DB access.
  Treat the backend purely as a REST API contract:
  - All data access goes through a single, isolated API client layer
    (e.g. `lib/api/` or `services/`) — no component or hook should call
    `fetch`/`axios` directly against a raw URL.
  - Build the API client against the confirmed route surface in Section 2a
    below. If a needed endpoint isn't listed there, don't invent a shape —
    check for updated API docs first, then fall back to a clearly-labeled
    mock (see Mock data rules) until confirmed.
  - Authentication/session handling goes through this same API layer
    (`POST /api/auth/register`, `/login`, `/logout`) so swapping the
    underlying auth mechanism later doesn't touch UI code.
  - Do not implement authorization logic as if it's the source of truth —
    the backend enforces RBAC + resource authorization (TECH_SPEC §24). The
    frontend only reflects what the API allows/denies; never treat
    client-side checks as security.
- **Payments:** Razorpay integration point. Frontend responsibility per
  TECH_SPEC §17 is strictly: request a payment order from the backend, launch
  the Razorpay checkout UI, and display whatever status the backend later
  confirms. **Never mark a payment successful based on a frontend callback
  alone** — the UI must wait for the backend's server-verified status
  (webhook-confirmed) before showing success. Build this behind the same API
  client layer.

### 2a. Confirmed REST API surface (from TECH_SPEC §32 — build the API client against this)

```
Auth:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/logout

Consumer:
  POST /api/service-requests
  GET  /api/service-requests
  GET  /api/service-requests/:id
  POST /api/service-requests/:id/cancel

Worker:
  GET  /api/worker/jobs
  GET  /api/worker/jobs/:id
  POST /api/worker/jobs/:id/accept
  POST /api/worker/jobs/:id/reject
  POST /api/worker/jobs/:id/start
  POST /api/worker/jobs/:id/complete

Admin:
  GET  /api/admin/requests
  GET  /api/admin/workers
  GET  /api/admin/requests/:id/candidates
  POST /api/admin/requests/:id/assign
  GET  /api/admin/complaints
  POST /api/admin/complaints/:id/resolve

Payments:
  POST /api/payments/orders
  POST /api/payments/webhook   (backend-only, frontend never calls this directly)
  GET  /api/payments/:id
```

This list is not necessarily exhaustive (e.g. ratings, invoices, verification
queue, welfare endpoints aren't enumerated yet) — treat missing routes as
"not yet confirmed," not "doesn't exist."

One unified visual theme is used across all three surfaces (Consumer, Worker,
Admin) — no per-app re-skinning. Keep the same component library and tokens
everywhere; only layout density and information depth should differ (Admin =
denser/data-heavy, Worker = simplest/largest touch targets, Consumer =
balanced).

### Application structure — three dashboards, one Next.js app
Sahyogh has **three distinct dashboards** — Consumer, Worker, and Cooperative
Administrator — served from a **single Next.js codebase**, not three separate
apps. TECH_SPEC §2 confirms this as `/consumer`, `/worker`, `/admin` route
prefixes, with platform-verification functions living as **protected admin
routes**, not a separate fourth app. Structure it as role-scoped route groups:

```
app/
  (consumer)/
    dashboard/
    requests/
    request/[id]/
    ...
  (worker)/
    dashboard/
    jobs/
    job/[id]/
    ...
  (admin)/
    dashboard/
    requests/
    workers/
    complaints/
    verification/        ← platform verification lives here, not a 4th app
    ...
  (auth)/
    login/
    register/
```

- Each route group gets its own layout, but layouts pull from the **same**
  design tokens/component library — do not fork the component library per
  role.
- Role-based routing (Phase 2) must guard these groups: a logged-in worker
  should never be able to navigate into `(admin)/*` routes, and vice versa,
  regardless of what URL is typed. This check happens in middleware/layout,
  and must degrade gracefully (redirect + message), not crash.
- Shared, role-agnostic code (API client layer, design tokens, generic UI
  primitives like Button/Card/Badge, auth session logic) lives outside the
  three groups in a common `lib/`, `components/ui/`, or `features/shared/`
  location — don't duplicate a Button component three times.
- Domain features that are role-specific (e.g. "eligible worker filtering"
  is Admin-only, "job acceptance" is Worker-only) live inside that role's
  route group or a matching `features/<role>/` folder — don't leak
  Admin-only components into the Consumer bundle.

---

## 3. Core Engineering Rules

- Preserve working functionality. Prefer incremental changes over rewrites.
- Do not invent external integrations that aren't specified.
- Do not expose secrets. Never commit Supabase service-role keys, DB
  passwords, API secrets, or private tokens — use environment variables.
- Do not fake backend persistence and call it done.
- Do not implement authorization only in the UI — business rules and access
  control belong server-side, owned by the backend team. The frontend must
  never be the source of truth for permissions; it only reflects what the
  API allows/denies (e.g. disabling an action the API would reject, showing
  the correct state when the API returns a 403). Do not attempt to
  reimplement row-level security logic on the client.
- Do not silently overwrite critical records (requests, assignments,
  payments, complaints) — use audit trails for critical mutations.
- Do not add dependencies without a clear reason.
- Do not create giant components — prefer small, reusable, domain-organized
  components (feature folders over generic `components/` dumping grounds).
- Every screen must handle **Loading, Empty, Error, and Success** states —
  no exceptions, this is part of "done," not a polish pass.
- Use accessible semantic HTML. **Accessibility takes priority over
  aesthetics** — never ship low-contrast controls to chase a "clean" look.
- Because the product targets low-digital-literacy and low-connectivity
  users, apply PRD §31 techniques wherever relevant: image compression before
  upload, lightweight screens, pagination, small payloads, cached job/service
  data, retry on transient failures, and duplicate-submission protection on
  forms.

### Mock data
Mock data is fine during UI-first development, but:
- Label it clearly in code (e.g. `// MOCK — replace before ship`).
- Isolate it (a dedicated `mocks/` or `fixtures/` module), never inline-mixed
  with real data-fetching logic.
- Replace with real data before marking any feature complete.

### Workflow per task
```
Inspect → Plan → Implement → Run → Test → Fix → Review
```
Understand a file's current purpose before changing it.

---

## 4. Design System

### Color tokens

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F5F7FA` | App background |
| `surface` | `#FFFFFF` | Cards, modals, inputs |
| `primary` | `#173F5F` | Headers, primary buttons, nav, Admin chrome |
| `secondary` | `#20639B` | Links, secondary actions, active states, info banners |
| `accent` | `#F6A623` | Primary CTAs, highlights, ratings/stars, "action needed" badges |
| `success` | `#2E8B57` | Verified, completed, payment success, accepted |
| `warning` | `#D9822B` | Pending, under review, awaiting action |
| `danger` | `#C0392B` | Rejected, cancelled, complaint, failed payment |
| `text-primary` | `#17212B` | Body text, headings |
| `text-secondary` | `#5A6B7B` | Muted text, timestamps, captions |
| `border` | `#DDE3EA` | Card borders, dividers, input borders |

Use `warning`/`danger`/`text-secondary`/`border` consistently for every status
badge in the app (request status, verification status, job status, complaint
lifecycle) — do not invent one-off colors per screen.

### Typography
- Font family: **Inter** for everything — body and headings (use weight 600–700
  for headings rather than a second display font). Single font family keeps
  bundle size low, which matters for the low-bandwidth requirement.
- If/when regional language support is added, pair with **Noto Sans
  Devanagari** — not required for MVP, just don't design in a way that blocks it.

### Component principles
- Reusable, composable components; feature/domain-based organization over
  type-based (`features/requests/`, `features/workers/`, not a flat
  `components/`).
- Status is always communicated with both color AND text/icon — never color
  alone (accessibility).
- Every list/table view needs pagination or virtualized loading given the
  low-bandwidth requirement.

---

## 4a. Confirmed Data Model (build UI state around these exact enums)

**Service Request status** (TECH_SPEC §11) — the UI's request-tracking timeline,
status badges, and admin queue filters must be built around this exact
sequence, not an invented simplified version:

```
REQUESTED → UNDER_REVIEW → ASSIGNMENT_PENDING → WORKER_ASSIGNED →
WORKER_ACCEPTED → SCHEDULED → IN_PROGRESS → COMPLETION_PENDING →
COMPLETED → PAYMENT_PENDING → PAID → INVOICED → CLOSED
```
Side branches: `CANCELLED`, `DISPUTED`, `NO_WORKER_AVAILABLE`.

The frontend must never let a user set an arbitrary status directly — status
only changes as a side effect of calling the correct action endpoint (accept,
reject, start, complete, cancel, assign). Treat status as read-only, derived
state in the UI.

**Payment status:** `PENDING`, `SUCCESS`, `FAILED`, `REFUND_PENDING`,
`REFUNDED`, `PARTIALLY_REFUNDED`.

**Complaint status:** `OPEN`, `UNDER_REVIEW`, `RESOLVED`, `REJECTED` (note:
this is the confirmed TECH_SPEC enum — simpler than the PRD's narrative
OPEN→UNDER_REVIEW→WORKER_RESPONSE→ADMIN_INVESTIGATION→RESOLUTION description;
build the UI against the TECH_SPEC enum and treat worker-response/
investigation as sub-states or activity-log entries within `UNDER_REVIEW`,
not separate top-level statuses).

**Roles:** `CONSUMER`, `WORKER`, `COOPERATIVE_ADMIN`, `PLATFORM_AUTHORITY`.

**Verification status** (worker, admin, federation, cooperative society, all
follow the same shape): `PENDING → UNDER_REVIEW → VERIFIED` or
`PENDING → REJECTED`. Verification status and operational/availability status
are always separate fields — never conflate them in the UI (confirmed again
by ARCHITECTURE §19 and TECH_SPEC §6's `verificationStatus` vs
`operationalStatus`).

**Core entities the UI will render/consume** (field names per TECH_SPEC §5–§28):
`User`, `ConsumerProfile`, `WorkerProfile`, `AdminProfile`, `Federation`,
`CooperativeSociety`, `ServiceCategory`, `ServiceRule`, `WorkerSkill`,
`Certification`, `WorkerAvailability`, `ServiceRequest`, `ServiceAssignment`,
`ServiceExecution`, `Payment`, `Invoice`, `Rating`, `Complaint`, `Refund`,
`WelfareRecord`, `Verification`, `Notification`, `AuditLog`. Use these exact
entity/field names in TypeScript types (e.g. `types/` or `lib/api/types.ts`)
so frontend types stay in sync with what the backend will actually return —
do not invent parallel naming.

**Photo requirement enum** (drives the conditional photo upload logic in the
request form): `NOT_REQUIRED`, `OPTIONAL`, `REQUIRED` — read this per-category
from `ServiceRule.photoRequirement`, never hardcode per service name.

---

## 4b. UI/UX Specification (Figma-accurate, Screen-by-Screen)

This section is the definitive visual and interaction source of truth,
derived directly from the confirmed Figma wireframes. The agent must
replicate these layouts exactly — do not invent alternative layouts,
navigation patterns, or component arrangements.

---

### Global Visual Language (confirmed from all screens)

- **Page background:** `#F5F7FA` — no pure-white page backgrounds.
- **Cards:** `#FFFFFF`, border `#DDE3EA`, border-radius 8–12px, minimal
  shadow — flat and clean, no heavy neumorphism.
- **Top navbar (all three portals):** full-width, dark green `#173F5F`
  background. Left: "Sahyog सहयोग / Cooperative Gig Services" — the
  Hindi "सहयोग" always appears alongside the Latin "Sahyog" in the
  wordmark, never omitted. Right: role switcher pill buttons
  (Consumer / Admin / Worker) — active role filled with accent orange
  `#F6A623`, inactive roles text-only in white/muted. This role switcher
  is a demo/dev convenience only — in production, the active role is
  determined by the authenticated session, not user choice from the navbar.
- **Section labels:** ALL CAPS, small font, letter-spacing tracked wide,
  muted `#5A6B7B` color — used consistently for sub-section headings
  (e.g. "HOW IT WORKS", "SERVICE CATEGORIES", "FILTER WORKERS",
  "COMPLETION NOTES", "JOB PROGRESS"). Never use ALL CAPS for body copy
  or page headings.
- **Page headings:** large, bold (700), `#17212B` — e.g. "Incoming
  Requests", "Assign Worker", "Active Job", "Job History".
- **Step indicators:** small ALL CAPS label "STEP X OF Y" above the page
  heading on multi-step flows — e.g. "STEP 1 OF 3", "STEP 2 OF 3".
- **Primary buttons:** filled `#173F5F`, white text, full-width or
  content-width depending on context, border-radius 6–8px. Arrow suffix
  ("→") used on navigation-forward actions ("Continue with Service →",
  "Submit Request →", "Review & Assign →").
- **Accent/CTA buttons:** `#F6A623` filled, white text — used for
  high-priority consumer CTAs ("Request a Service →", "Confirm & Pay").
- **Danger/reject buttons:** outlined with `#C0392B` border + text —
  used for the "Reject" action on Worker job cards.
- **Disabled buttons:** muted green-grey fill (desaturated), not
  clickable — used for "Assign Selected Worker →" before a worker is
  selected, and "Submit Rating" before stars are chosen.
- **Typography:** Inter throughout. Bilingual label "Sahyog सहयोग"
  in navbar uses the Hindi script inline — ensure the font stack includes
  a Devanagari fallback (Noto Sans Devanagari) for correct Hindi rendering.
- **Star ratings:** `#F6A623` filled stars, grey empty stars — used in
  worker cards, job history, and the rating screen.
- **Availability indicator:** green dot + "Available" text in success
  green; red dot + "Unavailable" in danger red — used on worker candidate
  cards in the Assign screen.
- **VERIFIED badge:** small pill, green background, white "VERIFIED" text
  — appears on worker cards everywhere (assign screen, worker portal
  header).
- **URGENT badge:** small pill, red/orange, "URGENT" text — appears on
  request cards when flagged urgent by admin.
- **Back navigation:** "← Back" text link at top-left of sub-pages —
  consistent across all three portals.
- **"NEW ASSIGNMENT" badge:** accent orange pill label on incoming job
  cards in the Worker portal.

---

### Auth Screens — `/(auth)/`

#### Consumer Registration / Login
Split-panel desktop layout. Left panel: dark green (`#173F5F`), Sahyogh
logo top-left, tagline "Built for the community, by the community.",
supporting copy, footer links. Right panel: white card, centered form.
- Heading: "Create an account", subheading: "Welcome! Let's get you set
  up on Sahyog."
- Role toggle: "Join as Member" | "Join as Worker" — pill buttons,
  active = `#173F5F` filled, inactive = outlined. Switching changes
  fields below without page reload.
- Member fields: Full Name, Email Address, Password (show/hide toggle),
  Terms & Privacy checkbox, "Create Account" primary button (full-width),
  "or continue with" divider, Google + Facebook OAuth buttons (outlined
  with brand icons), "Already have an account? Log in" link.

#### Worker / Contributor Registration
Right panel heading: "Join as a Contributor" / "Create your cooperative
account". Sub-toggle: "Gig Worker" | "Federation Admin".
- Gig Worker fields: Full Name, Age, Location (city/region with pin icon),
  Name of Society/Federation, Federation ID No. (optional), Skill Proof /
  Certification upload (dashed card, document icon, "Drag and drop your
  certification or click to browse", "Supports PDF, JPG, PNG (Max 5MB)"),
  "Create Account" full-width button, "Already have an account? Sign in".
- Left panel: botanical/leaf illustrated background, "Empowering your
  community through fair work.", "Join a network that values your skill
  and contribution.", "Built for the community, by the community."

---

### Consumer Portal — `/(consumer)/`

#### Navigation
**Horizontal top tab bar** (below the global navbar) with tabs:
Home | Browse | New Request | Track | Pay | Rate
Active tab: underline indicator in `#173F5F` or accent. This is a
desktop-oriented layout — on mobile, this collapses appropriately.

#### Home (`/(consumer)/dashboard` or `/`)
- Hero banner: full-width dark green card, "SAHYOG — सहयोग" small label
  top-left, heading "Verified Cooperative Workers, On Demand" in large
  white bold, subtext "Connect with skilled workers from registered Labour
  Cooperative Societies — verified, accountable, and managed by cooperative
  administrators.", "Request a Service →" accent CTA button.
- **"HOW IT WORKS" section:** 4 numbered step cards in a row:
  - 01 — Submit Request: "Describe your service need, date, and location"
  - 02 — Admin Reviews: "Cooperative admin filters and manually assigns a
    verified worker"
  - 03 — Worker Arrives: "Assigned worker accepts and performs the service"
  - 04 — Pay & Rate: "Confirm completion, pay digitally, and rate the
    worker"
  Each card: number in accent orange (`#F6A623`), bold step title,
  description text, white card background, border.
- **"SERVICE CATEGORIES" section:** 2×4 grid (8 categories shown):
  Plumbing (24 workers), Electrical (18 workers), Carpentry (12 workers),
  Painting (31 workers), Cleaning (45 workers), Gardening (9 workers),
  Driving (22 workers), Appliance Repair (16 workers). Each card: white
  background, category icon top, category name bold, worker count muted
  below. Worker count is live data — do not hardcode.

#### Browse / Select a Service (`/(consumer)/browse` — STEP 1 OF 3)
- "← Back" link, "STEP 1 OF 3" label, heading "Select a Service".
- 2-column grid of service cards. Each card: icon top-left, category name
  bold, comma-separated sub-services in accent orange below (e.g.
  "Pipe repair, drainage, tap installation, water heaters"). Border,
  white background, selectable (highlight border on selection).
- Categories shown: Plumbing, Electrical, Carpentry, Painting, Cleaning,
  Appliance Repair (and others from API).
- "Continue with Service →" primary button at bottom — disabled until
  a category is selected (muted state when no selection).

#### Describe Your Request (`/(consumer)/new-request` — STEP 2 OF 3)
- "← Back", "STEP 2 OF 3", heading "Describe Your Request".
- **SERVICE TYPE:** read-only display field showing selected category
  (e.g. icon + "Plumbing") in a bordered box — not editable here.
- **PROBLEM DESCRIPTION \*:** multi-line textarea, placeholder e.g.
  "Describe the issue clearly — e.g. 'Kitchen sink has a slow leak under
  the cabinet. Water drips constantly.'"
- **PREFERRED DATE \* / PREFERRED TIME \*:** side-by-side. Date: native
  date input (format dd-mm-yyyy). Time: dropdown with time-slot options
  — "Morning (8am – 12pm)", "Afternoon (12pm – 4pm)", "Evening
  (4pm – 8pm)" — not a free time picker.
- **SERVICE ADDRESS \*:** three fields stacked:
  - "Flat / House No, Building name" (full width)
  - "Area / Locality" (half width) + "PIN Code" (half width) side-by-side
- **ATTACH PHOTOS (OPTIONAL):** dashed border upload zone, "Drag & drop
  or click to upload", "JPG, PNG – max 5MB each". Shown/hidden and
  label changed based on `ServiceRule.photoRequirement` — if `REQUIRED`,
  change label to "ATTACH PHOTOS (REQUIRED)" and validate before submit.
- **"Submit Request →"** full-width primary dark green button at bottom.

#### Track Request (`/(consumer)/track/[id]`)
- "← My Requests" back link, REQ-XXXX ID top-left, status badge
  top-right (e.g. "ASSIGNED" in blue pill).
- Page heading: "ServiceCategory — ProblemSummary" (e.g. "Plumbing —
  Leaking Pipe").
- **Left panel — REQUEST TIMELINE:** vertical timeline with dot indicators.
  Completed steps: filled green dot, bold label, timestamp below in muted.
  Upcoming steps: hollow dot, muted label, expected timing in italic muted.
  Steps shown: Request Submitted → Admin Reviewing → Worker Assigned →
  Worker En Route / On Site → Service Completed → Payment & Rating.
- **Right panel — ASSIGNED WORKER card** (visible only after
  `WORKER_ASSIGNED` status): avatar circle (initials, dark green bg),
  worker name, "VERIFIED" badge, then labeled rows: Cooperative,
  Experience, Rating (★ score + job count in orange), Area.
- **Right panel — SERVICE DETAILS card:** Date, Time (slot label e.g.
  "Morning slot"), Location (area name).
- **"Confirm & Pay" accent button** (full-width, `#F6A623`) — shown only
  when status is `COMPLETION_PENDING` or `COMPLETED`. Navigates to Pay
  screen.

#### Confirm & Pay (`/(consumer)/pay/[id]`)
- "← Back", heading "Confirm & Pay".
- **ORDER SUMMARY card:** white card with labeled line items:
  - Service name + description — amount (₹)
  - Service charge — amount (₹)
  - GST (18%) — amount (₹)
  - **Total** (bold) — total amount (₹) in `#173F5F`
- **PAYMENT METHOD section:** radio list, options:
  - UPI / GPay / PhonePe (default selected)
  - Net Banking
  - Debit / Credit Card
- **Sandbox notice banner** (dev/test mode only): light yellow background,
  "Sandbox Mode: This is a test payment flow. No real transaction will
  occur." — remove or gate this behind an env flag in production.
- **"Pay ₹ AMOUNT" button:** full-width, accent `#F6A623`, shows the
  actual total amount in the label. Triggers Razorpay checkout.
  Never mark payment complete from the frontend callback alone.

#### Rate Your Experience (`/(consumer)/rate/[id]`)
- Heading: "Rate Your Experience".
- White card containing:
  - Worker avatar (initial circle, dark green), worker name, service +
    date below (e.g. "Plumbing · 29 Aug 2026") — muted text.
  - **5-star tap selector:** empty grey stars, fill to `#F6A623` on tap.
    Stars are large, tappable, adequate touch target.
  - **Written review textarea:** "Write a brief review (optional) — e.g.
    'Very professional, fixed the issue quickly. Would recommend.'"
  - **"ANY ISSUES?" section (ALL CAPS label):** checkbox group —
    □ Late arrival  □ Incomplete work  □ Behaviour issue  □ Overcharging
    These checkboxes feed into the complaint/flag system, not just display.
  - **"Submit Rating" button:** full-width, disabled/muted until at least
    one star is selected. Activates on star selection.
- One-time only — after submission hide the form and show a confirmation
  message.

---

### Admin Portal — `/(admin)/`

#### Navigation
**Horizontal top tab bar** (below global navbar):
Requests | Assign | Monitor
Active tab: underline indicator.

#### Incoming Requests (`/(admin)/requests` — "Requests" tab)
- "ADMIN DASHBOARD" small ALL CAPS label, heading "Incoming Requests".
- **Filters row (top-right):** "All Services ▾" dropdown + "All Areas ▾"
  dropdown — filter the request list below.
- **4 KPI metric cards in a row:**
  - **4** Pending Review — number in warning orange `#D9822B`
  - **7** Assigned Today — number in secondary blue `#20639B`
  - **12** In Progress — number in accent `#F6A623`
  - **89** Completed (Month) — number in success green `#2E8B57`
  Each card: white background, large bold colored number, muted label
  below. No charts on this screen — just numerics.
- **Request list:** each row is a white card with:
  - Left: REQ-XXXX ID (muted), tag pills (service category e.g.
    "Electrical", area e.g. "Borivali East"), optional "URGENT" red pill.
  - Below tags: request title bold (e.g. "MCB tripping repeatedly"),
    consumer name · date · time-slot in muted text.
  - Right: status badge (e.g. "PENDING" in warning orange), "Review &
    Assign →" dark green button.
- List is paginated. Most recent / urgent requests shown first.

#### Assign Worker (`/(admin)/assign/[id]` — "Assign" tab)
- "← Back", heading "Assign Worker".
- **Request summary card** (light teal/green-tinted background):
  REQ-ID pill + service category pill + area pill, request title +
  consumer name bold, date · time slot · address muted below.
- **"FILTER WORKERS" row:** 4 checkboxes, all checked by default:
  ☑ Verified Only  ☑ Available  ☑ Skill Match  ☑ Area Match
  Unchecking expands/contracts the candidate list accordingly.
- **Candidate list:** each worker row is a white card:
  - Avatar circle (initial, colored bg), worker name, worker ID (e.g.
    W-041), "VERIFIED" green badge.
  - Skill tag pills + area tag pills below name.
  - Right: ★ rating (orange), job count below, availability dot +
    "Available"/"Unavailable" text in green/red.
  - Row is selectable (click to select — highlight border on selection).
    Only one worker selectable at a time.
- **"Assign Selected Worker →" button:** full-width, disabled/muted until
  a worker row is selected. Activates on selection. Calls
  `POST /api/admin/requests/:id/assign`.

#### Assignment Success (full-page confirmation)
Centered layout, no sidebar panels:
- Large dark green circle with white checkmark icon.
- Heading: "Worker Assigned" (bold, large).
- Subtext: "[WorkerName] has been notified. Awaiting worker acceptance."
- "← Back to Requests" dark green button.
This is a full-page success state, not a toast — the admin sees clear
confirmation before moving on.

#### Job Monitoring (`/(admin)/monitor` — "Monitor" tab)
- "ADMIN DASHBOARD" label, heading "Job Monitoring".
- List of active/recent jobs. Each row is a white card:
  - Left: REQ-XXXX ID (muted), service category tag pill.
  - Center: "WorkerName → ConsumerName" (bold), "Started: date, time" muted.
  - Right: status badge — "IN_PROGRESS" in blue pill, "COMPLETED" in
    green pill.
- No filters shown on this screen in the wireframe — show all active +
  recently completed jobs, most recent first.

---

### Worker Portal — `/(worker)/`

#### Navigation
**Horizontal top tab bar** (below global navbar):
Jobs | Active | History

#### Assigned Jobs (`/(worker)/jobs` — "Jobs" tab)
- "WORKER PORTAL" small ALL CAPS label, heading "Assigned Jobs".
- **Worker identity header card:** dark green (`#173F5F`) background,
  full-width. Avatar circle (initial, accent orange bg), worker name bold
  white, "VERIFIED" white/green badge, cooperative name · area in muted
  white. Right: ★ rating in orange, "X completed" muted white below.
- **Incoming job cards** (one per pending assignment):
  - "NEW ASSIGNMENT" orange pill badge + REQ-ID.
  - Service category + description bold (e.g. "Plumbing — Kitchen sink
    leaking").
  - 📍 Full address (after assignment notification).
  - 📅 Date · Time slot.
  - 👤 "Consumer: [Name]".
  - Two full-width buttons side by side:
    - "Accept Job" — dark green filled, left half.
    - "Reject" — outlined red border + red text, right half.
  - Card has an orange/accent left-border or outline to draw attention.
- **"RECENT HISTORY" section below:** last 2–3 completed jobs.
  Each row: service name, consumer name · date, star rating right,
  "COMPLETED" green badge right.

#### Active Job (`/(worker)/active/[id]` — "Active" tab)
- "← Back", heading "Active Job".
- **Job detail card** (light blue-tinted border):
  - REQ-XXXX (muted small).
  - Service + description bold.
  - 📍 Full address (clickable/copyable).
  - 👤 Consumer name · **phone number in bold** (e.g. "+91 98765 43210"
    — shown and clickable after job accepted, so worker can contact).
  - 📅 Date · time slot.
- **"JOB PROGRESS" section:**
  - "Mark as Started" action card — white card, bold label, subtext "Tap
    when you have arrived and begun work". Tapping calls
    `POST /api/worker/jobs/:id/start` and transitions to IN_PROGRESS.
- **"COMPLETION NOTES" section (ALL CAPS label):**
  - Textarea: "Describe work done — e.g. 'Replaced the P-trap under
    kitchen sink. Leak resolved. Tested for 10 minutes.'"
- **"COMPLETION PHOTOS (OPTIONAL)" section:**
  - Dashed upload zone: "Upload before/after photos".
  - Label changes to REQUIRED if `ServiceRule.photoRequirement = REQUIRED`.
- **"Mark Job as Completed" button:** full-width, accent `#F6A623`,
  disabled/muted until completion notes are filled. Calls
  `POST /api/worker/jobs/:id/complete`.

#### Job History (`/(worker)/history` — "History" tab)
- Heading "Job History".
- List of completed jobs. Each row is a white card:
  - REQ-XXXX (muted small, top-left).
  - Service category + description bold (e.g. "Plumbing — Tap
    replacement").
  - Consumer name · date muted below.
  - Right: ₹ amount bold (e.g. "₹ 550"), star rating below in orange.
- No actions on this screen — read-only history. Paginated.

---

### Cross-Cutting UX Rules (confirmed from wireframes)

- **Skeleton loaders:** every list/data screen must show content-shaped
  skeleton placeholders while fetching — not spinners alone.
- **Empty states:** every list must have a helpful empty state message +
  icon — never a blank screen.
- **Error states:** user-friendly message + retry — never raw errors.
- **Back navigation:** always "← Back" or "← [Section Name]" text link
  at top-left of sub-pages — consistent across all portals.
- **Form validation:** inline on-blur. Required fields marked with \*.
  Error text in danger red `#C0392B` below the field.
- **Disabled button states:** muted/desaturated fill — clearly
  non-interactive. Used on "Continue with Service →" (no category
  selected), "Assign Selected Worker →" (no worker selected), "Submit
  Rating" (no stars), "Mark Job as Completed" (no notes).
- **Full-address reveal rule:** consumer's full address is shown to the
  worker only after the job is accepted (Active Job screen), not on the
  pending job card in the Jobs tab.
- **Consumer phone number reveal rule:** worker sees consumer phone number
  only on the Active Job screen — never on the job queue or history.
- **Status badge color map** (pill-shaped, always color + text):
  - `PENDING`, `REQUESTED`, `UNDER_REVIEW`, `ASSIGNMENT_PENDING` →
    warning orange `#D9822B`
  - `ASSIGNED`, `WORKER_ASSIGNED`, `WORKER_ACCEPTED`, `SCHEDULED` →
    secondary blue `#20639B`
  - `IN_PROGRESS`, `COMPLETION_PENDING` → blue `#20639B` (per wireframe,
    IN_PROGRESS shown in blue, not orange)
  - `COMPLETED`, `PAID`, `INVOICED`, `CLOSED`, `VERIFIED` →
    success green `#2E8B57`
  - `CANCELLED`, `DISPUTED`, `REJECTED`, `NO_WORKER_AVAILABLE` →
    danger red `#C0392B`
- **Sandbox payment banner:** light yellow info banner on Pay screen during
  development. Gate behind `NEXT_PUBLIC_PAYMENT_SANDBOX=true` env var.
- **"Sahyog सहयोग" wordmark rule:** the Hindi script always appears
  alongside the Latin script in the navbar and any branding context.
  Never render just "Sahyog" without "सहयोग" in the top navbar.
- **Accessibility:** 4.5:1 minimum contrast for all text. All inputs have
  visible `<label>` elements — no placeholder-as-label. All interactive
  elements keyboard-navigable. Images have alt text.

---

## 5. Product Rules the Agent Must Never Violate

- Never write clinical/diagnostic-style claims — not applicable to this
  product's domain, but the underlying principle carries over: never assert
  something the system hasn't actually verified. E.g. don't render "Worker is
  reliable" — render what's actually known ("4.8★ average, 32 completed jobs").
- The platform **recommends/filters** eligible workers; it never auto-assigns.
  The UI must always require an explicit administrator action to finalize an
  assignment (PRD §11–12).
- Consumers must never see worker identity documents, Aadhaar numbers,
  payment identifiers, or internal cooperative records (PRD §6, §30). Audit
  every consumer-facing worker card against this list.
- Photo upload is **conditional per service category**, never mandatory
  platform-wide (PRD §8). Build the request form to read this from
  category config, not hardcode it.
- Consumer cancellation is only valid within **3 hours of worker approval**
  (PRD §20) — enforce this in the UI (disable/hide the action after the
  window) but note the real enforcement must also happen server-side.
- Worker verification status and operational availability are **separate
  fields** — never conflate "verified" with "available" in the UI.
- Complaint 24-hour resolution is an **operational target, not a guarantee**
  — do not phrase any UI copy as a promise/SLA.
- Financial split (cooperative/platform/worker) and settlement formulas are
  explicitly **deferred** — do not build UI that implies a specific split
  exists yet; show the approved amount only (PRD §10, §23).
- The eligibility/candidate list the Admin sees is a **decision-support
  list**, never a pre-selected/default worker (ARCHITECTURE §7) — the UI
  must require an explicit selection action, with no "recommended" worker
  pre-checked in a way that could be one-clicked through.
- Payment success must **only** be reflected in the UI after backend
  confirmation — never flip a payment/request to a "paid" visual state
  purely because Razorpay's client-side checkout returned a success
  callback (ARCHITECTURE §13, TECH_SPEC §17).
- Assignment history must never be overwritten (TECH_SPEC §12) — if the UI
  shows past assignments (e.g. after a worker rejection → reassignment), it
  must render them as a history/timeline, not replace the old record in place.

---

## 6. Build Order (Critical Path First)

Build the core service lifecycle before anything else. Everything outside
this path is secondary, even if it appears in an earlier-numbered phase of
the task list:

```
Consumer Request → Admin Review → Eligible Worker Filtering →
Manual Assignment → Worker Acceptance → Scheduling → Service →
Completion → Payment → Invoice → Rating
```

### Recommended sequencing
1. **Foundation** — repo setup, Tailwind theme config with tokens above,
   base layout shells for the 3 surfaces, linting/formatting.
2. **Auth** — registration (consumer/worker/admin), login/logout, session
   handling, role-based routing, account-status-aware routing (PENDING /
   UNDER REVIEW / VERIFIED / REJECTED gates).
3. **Consumer request flow** — category selection → dynamic
   category-specific questions → conditional photo upload → location →
   schedule → review → submit → tracking.
4. **Admin request review + eligible worker filtering + manual assignment.**
5. **Worker job queue** — accept/reject with reason, schedule view.
6. **Service execution states** — scheduled → in-progress → completion
   (with conditional before/after evidence) → consumer confirm/report-problem.
7. **Payment UI** (Razorpay integration point) → **Invoice** (consumer +
   admin views).
8. **Rating** (consumer → worker) and admin performance view.
9. Only after the above works end-to-end: verification queues, complaints/
   refunds, cancellation flows (consumer 3-hr rule, worker cancellation +
   replacement), welfare view, notifications, low-bandwidth hardening,
   demo dataset.

Do not front-load secondary phases (notifications, welfare, advanced
verification UI) ahead of getting one full request-to-rating loop working.

---

## 7. Explicit Non-Goals (Do Not Build)

Per PRD §3 and the task list's Deferred section — do not implement, even if
asked to "add a bit of" these:
- Fully automatic worker assignment
- Emergency/on-demand booking
- AI demand forecasting or AI-assisted workforce allocation
- Live worker location tracking
- Full insurance claims management
- Complex cooperative/platform/worker settlement rules or a bonus engine
- Fully offline operation (this is low-bandwidth-*assisted*, not offline-first)

---

## 8. Definition of Done

A feature is complete only when **all** of the following are true:
- UI exists and covers Loading / Empty / Error / Success states
- It persists correctly where required (no fake persistence)
- Authorization/permissions are correct (and enforced server-side, not just hidden in UI)
- Validation exists
- Errors are handled and messages are sanitized (no raw backend errors surfaced)
- Responsive behavior works across mobile/desktop
- Audit behavior exists where the PRD requires it (assignments, cancellations, complaints)
- No obvious console errors remain
- It was actually tested — not assumed to work

---

## 9. Communication Protocol

After each unit of work, report:
- What changed
- What was tested (and how)
- Any known limitation
- What should be done next

Never claim something works if it wasn't actually verified.
