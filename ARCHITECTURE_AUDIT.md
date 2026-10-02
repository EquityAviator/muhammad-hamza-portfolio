# Portfolio Architecture Audit

**Scope:** Architecture and maintainability only. The approved visual direction and current UI are intentionally not redesigned.

**Sources reviewed:**
- `Portfolio requiremtn document.docx` from the supplied archive
- Current Next.js source in `app/`, `components/`, and `lib/`
- Current package and Next.js configuration

## Executive assessment

The current project has successfully moved from a static HTML prototype to a working **Next.js App Router + React + TypeScript** application. It already has several good foundations: typed project data, `next/font`, static prerendering, client-only dynamic imports for expensive interactions, reduced-motion CSS, and a patched Next.js release.

However, it does **not yet implement the full architecture described in the supplied requirements document**. The main limitation is not the UI; it is the content and route model. The current site is effectively one large client page with four compact project summaries. The requirements describe a maintainable content system with project-specific schemas, evidence and claim tracking, dedicated work/research/about/contact routes, project detail pages, SEO documents, structured metadata, graceful missing-data behavior, and server/client boundaries that keep most content server-rendered.

## Current architecture snapshot

```text
Next.js App Router
  └── app/page.tsx                 Client component for the whole homepage
        ├── ThemeToggle            Client component
        ├── Reveal                 Client logic embedded in page
        ├── ResearchTimeline       Dynamically imported client component
        └── CaseStudyModal          Dynamically imported client component

lib/content.ts                     One typed array with four project summaries
app/globals.css                    Large global stylesheet and design tokens
app/layout.tsx                     Global metadata and fonts
```

## Requirement coverage matrix

| Area | Requirement direction | Current state | Assessment |
|---|---|---|---|
| Framework | Next.js + React + TypeScript | Present | **Met** |
| App Router | Route-based architecture | Only `/` exists | **Partial** |
| Styling | Centralized tokens, maintainable system | CSS variables exist, but one large global stylesheet remains | **Partial** |
| Content | Structured typed content by domain | One `Project` type and one `projects` array | **Partial** |
| Project schema | Status, role, timeline, technologies, links, metrics, images, architecture, limitations, research, privacy | Most fields are absent | **Gap** |
| Evidence model | Separate claim from evidence | Evidence is one free-text field | **Partial** |
| Verification | Confirmed / attributed / inferred / unknown | Not represented in data | **Gap** |
| Dynamic presentation | Project-type-specific content hierarchy | All four projects share one modal shape | **Gap** |
| Maintainability | Add project data and have it appear automatically | Cards map from data, but visual composition is index-based | **Partial** |
| Homepage rendering | Server-render meaningful content by default | Entire `app/page.tsx` is marked `'use client'` | **Gap** |
| Client boundaries | Client React only where necessary | Theme, scroll state, reveal, cards, and page composition are all client-bound | **Gap** |
| Project routes | `/work`, `/work/[slug]` | Not present | **Gap** |
| About/research/contact routes | Dedicated meaningful URLs | Not present | **Gap** |
| SEO | Route metadata, canonical, OG/Twitter, sitemap, robots | Global title/description/OG only | **Partial** |
| Structured data | Person, WebSite, CreativeWork/SoftwareApplication where accurate | Not present | **Gap** |
| Project social previews | Optional project OG images | Not present | **Gap** |
| Performance | Static rendering, dynamic imports, optimized assets, small client bundles | Static build and dynamic imports present; whole page client-side | **Partial** |
| Media model | Image metadata, alt, dimensions, lazy strategy, video poster strategy | No actual media/content model | **Gap** |
| Loading/error/empty states | Explicit states for dynamic systems | Research loading exists; no broader state model | **Partial** |
| Accessibility | Semantic HTML, keyboard, focus, modal behavior, mobile nav | Semantic base exists; focus handling, focus trap, and mobile menu are incomplete | **Partial** |
| Resume | View/download readable PDF | No public resume route or asset | **Gap** |
| Contact | Direct email first; optional secure server form | Direct email exists; no form/backend, which is acceptable for initial scope | **Acceptable** |
| Database/CMS | Avoid initially | No database/CMS | **Met** |
| Security | No secrets, secure external links, no unnecessary APIs | No secrets; external links use `noreferrer` | **Mostly met** |
| Deployment | CDN/HTTPS/preview/build pipeline | Local server only in this session | **Not configured** |
| 404 | Branded not-found experience | Default Next not-found | **Gap** |
| Analytics | Optional privacy-conscious event tracking | Not included | **Acceptable** |

## Findings by architecture layer

### 1. Rendering boundary is too client-heavy

`app/page.tsx` begins with `'use client'`. That makes the entire homepage a client component even though most of its content is static portfolio content.

This conflicts with the document's server/client rule:

> Use server rendering by default. Use client-side React only where necessary.

The current client-only responsibilities are small and separable:

- Theme preference and theme toggle
- Sticky-header scroll state
- IntersectionObserver reveal behavior
- Case-study selection and modal
- Research timeline tab selection

The page composition, hero copy, project summaries, about text, contact links, footer, and most project markup can remain server-rendered.

**Recommended boundary:** keep `app/page.tsx` as a server component and isolate the interactive areas into `Header`, `Reveal`, `WorkSection`, `ThemeToggle`, `ResearchTimeline`, and `CaseStudyModal` client islands.

### 2. Project data is not yet a portfolio content system

The current type is:

```ts
type Project = {
  key: string
  number: string
  kicker: string
  meta: string
  title: string
  summary: string
  problem: string
  built: string
  evidence: string
  stack: string
}
```

That is enough for the current homepage, but not enough for the supplied architecture. Missing concepts include:

- Stable `slug`
- Multiple categories
- Explicit `status`
- `featured`
- `role`
- Timeline
- Structured technologies with category
- Capabilities
- Features
- Architecture description and nodes
- Metrics with context
- Images/videos with `src`, `alt`, `width`, `height`, and project/type metadata
- Links with optional rendering
- Engineering decisions
- Limitations and future work
- Research metadata
- Privacy/confidentiality
- Keywords

**Important maintainability issue:** the current homepage selects project visual markup by array index. Adding a fifth project or reordering projects can silently assign the wrong visual treatment. The content model should carry a `visual` or `presentationType` field, and rendering should switch on that stable field rather than `index`.

### 3. Claim/evidence verification is too implicit

The requirements explicitly say unsupported claims must not become facts and define these internal classifications:

- `FACT`
- `ATTRIBUTED`
- `INFERENCE`
- `UNKNOWN`

The current `evidence` string communicates context to a visitor but does not encode which statements are verified, what source supports them, or whether a metric is directly confirmed.

A stronger content model would use:

```ts
type EvidenceStatus = 'confirmed' | 'attributed' | 'inferred' | 'unknown'

type Claim = {
  statement: string
  status: EvidenceStatus
  source?: string
}
```

Public copy can still remain clean; the additional metadata protects future content updates and supports an agent-friendly editing workflow.

### 4. Route architecture is missing

The requirements describe these meaningful routes:

```text
/
/work
/work/[slug]
/about
/research
/contact
```

The current site only has anchor sections on `/`. This is acceptable for a first visual prototype, but it prevents:

- Project-specific SEO metadata
- Project-specific canonical URLs
- Direct sharing of individual case studies
- Progressive disclosure beyond a modal
- Back/forward browser navigation for case studies
- Project-to-project and research-to-project linking
- Route-level server rendering and caching

The current modal is a useful interaction, but it should complement — not replace — `/work/[slug]` pages.

### 5. SEO is incomplete

Current metadata includes a global title, description, and Open Graph title/description. Missing architecture-level SEO pieces include:

- Canonical URL declaration
- Twitter/X card metadata
- `sitemap.ts`
- `robots.ts`
- Route-specific metadata for work and project pages
- Project-specific OG images or a generated OG route
- JSON-LD structured data
- Branded 404 response

The current `metadataBase` also points to a temporary sandbox preview URL. That is fine for preview testing but should be replaced with the real production domain before deployment.

### 6. Performance foundation is good but not fully aligned

Already done well:

- Static prerendered homepage
- `next/font`
- Dynamic imports for the modal and research timeline
- No third-party analytics or video
- IntersectionObserver rather than continuous reveal calculations
- Passive scroll listener
- CSS reduced-motion handling

Remaining architectural issues:

- Entire homepage is currently client-rendered/hydrated
- No structured media pipeline using `next/image`
- No image metadata or responsive sizing model
- No route-level lazy loading because there are no project routes
- No explicit asset cache strategy outside the default Next build behavior
- CSS is a single large global file rather than a smaller token layer plus component styles

The current page is still lightweight in the build output, but the server/client boundary should be fixed before adding more projects or richer media.

### 7. Component architecture is too concentrated

The requirements recommend domain-oriented boundaries such as:

```text
components/
  layout/
  navigation/
  hero/
  projects/
  project/
  research/
  experience/
  education/
  contact/
  ui/
  motion/
```

The current project has only three interactive components and keeps nearly the entire page composition, hero, cards, visual variants, about section, and contact section in `app/page.tsx`.

It is not yet a thousands-of-lines monolith, but `page.tsx` is already doing too much. The architecture should separate:

- Site shell/header/footer
- Hero/system diagram
- Work section and project card
- Project visual variants
- Research section
- About/experience/education
- Contact links/form boundary
- Motion utilities

This will make a new project mostly a data change rather than a page edit.

### 8. Project-specific content depth is missing

The supplied document requires progressive disclosure:

```text
Quick summary
  → Problem
  → Solution
  → Visual evidence
  → Architecture
  → Technical details
  → Experiments / metrics
  → Challenges
  → Limitations
  → Links
```

The current modal stops at:

- Problem
- What I built
- Evidence
- Stack

That is a good compact summary, but it is not a full case-study architecture. In particular, it lacks:

- Architecture/system anatomy
- Engineering decisions and trade-offs
- Metrics separated from narrative evidence
- Limitations and future work
- Verified links
- Related research/projects
- Next-project navigation

### 9. Accessibility needs a dedicated interaction layer

Good foundations:

- Semantic headings and sections
- Real links for email and external profiles
- Buttons for modal/timeline controls
- `aria-label` on the theme toggle and close buttons
- Reduced-motion CSS

Remaining gaps:

- Modal does not implement a focus trap
- Modal does not restore focus to the triggering button
- No `aria-describedby` or explicit modal description relationship
- No visible universal `:focus-visible` treatment was found
- Mobile navigation is hidden rather than replaced with an accessible open/close menu
- Theme mode is only dark/light; the document allows dark/light/system as a three-state option
- No dedicated keyboard shortcut/command interface

These are implementation concerns, not a reason to change the visual direction.

### 10. Resume and experience data are absent

The supplied archive contains a CV and the requirement document explicitly requires resume view/download and structured experience/education. The current website has a small education reference in the hero but no:

- Public PDF asset
- Resume link
- Experience data model
- Dedicated experience section/page
- Reusable project metadata for resume alignment

The requirements say education should stay concise and below professional work; that can be added without disturbing the current UI hierarchy.

### 11. Error and empty states are under-specified

The current research timeline has a loading placeholder, which is good. But the architecture does not yet define:

- Empty filtered-work state
- Missing project slug handling
- Human-readable 404 page
- Missing optional link/media behavior
- Error boundary for interactive project UI
- Offline/degraded behavior if a future contact or analytics service is added

A structured data model with optional fields and conditional render helpers should handle these cases without empty buttons or broken layout.

## What is already correct and should be preserved

The following decisions from the current implementation align well with the supplied document and should not be replaced merely for completeness:

1. **No database or CMS initially.** The requirements explicitly recommend local structured content for a normal personal portfolio.
2. **Direct email contact.** The requirements say contact information should not be hidden behind a form. A form can remain a later secondary feature.
3. **Typed content.** `lib/content.ts` is the correct direction; it needs a richer schema rather than a database.
4. **Dynamic imports for expensive interactions.** The modal and research timeline are appropriate client islands.
5. **CSS for lightweight motion.** The document says Motion should be used for higher-level animation and CSS for simple effects. The current CSS animation approach is valid.
6. **Evidence-first writing.** The current project summaries avoid fake user counts, fake client results, and generic marketing claims.
7. **Single visual language.** The current site already follows the document's technical/editorial design principles; architecture work should preserve it.

## Recommended implementation order

### P0 — Before adding more content

1. Move the homepage back to a server component.
2. Split interactive responsibilities into client islands.
3. Expand `Project` into a stable schema with `slug`, `status`, `role`, categories, links, metrics, limitations, and evidence records.
4. Replace index-based project visual selection with a stable `presentationType` field.
5. Add `not-found.tsx`, `sitemap.ts`, `robots.ts`, canonical metadata, and JSON-LD.

### P1 — Make the portfolio navigable as a product

6. Add `/work` and `/work/[slug]` with `generateStaticParams`.
7. Add route-level metadata and progressive-disclosure case-study sections.
8. Add `/about`, `/research`, and `/contact` route boundaries while preserving the current homepage anchors.
9. Add the supplied CV as a public resume asset with view/download links.
10. Add project-to-project and research-to-project relationships.

### P2 — Strengthen usability and evidence

11. Add a focus-managed accessible dialog or route-first case-study interaction.
12. Add a mobile menu client island.
13. Add a three-state theme preference: dark / light / system.
14. Add structured image/video metadata only when real project media is available.
15. Add optional privacy-conscious analytics only after deployment goals are clear.

### P3 — Optional future infrastructure

16. Add a secure contact endpoint only if contact submissions are required.
17. Add a CMS only when content changes become frequent or multi-person editing is real.
18. Add Motion for React only for interactions that benefit from layout/shared-element/gesture choreography; keep existing CSS motion for simple reveals.

## Final conclusion

The current project is a good **visual prototype and lightweight Next.js homepage**, but it is not yet the full maintainable portfolio system specified by the document. The right next step is not a UI redesign. It is an architecture pass focused on:

- server-first rendering,
- richer typed content,
- route-level case studies,
- evidence-aware content,
- structured metadata and SEO,
- reusable domain components,
- accessible interaction boundaries,
- and resume/research/project cross-linking.

That approach preserves the UI that is already working while making the portfolio extensible, indexable, evidence-safe, and easier to maintain.
