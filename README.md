# Muhammad Hamza Mushtaq — Next.js Portfolio

A responsive Next.js App Router portfolio for Muhammad Hamza Mushtaq, Software & AI Engineer. The visual direction remains the Signal / Noise system; the implementation is organized as a server-first, evidence-aware portfolio product.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4173`.

## Production

```bash
pnpm lint
pnpm build
pnpm start
```

## Architecture

- `app/page.tsx` — server-rendered homepage composition
- `app/work/page.tsx` — work index
- `app/work/[slug]/page.tsx` — statically generated case studies
- `app/about/page.tsx` — about route
- `app/research/page.tsx` — research route
- `app/contact/page.tsx` — direct-contact route
- `app/resume/page.tsx` — view/download resume route
- `app/not-found.tsx` — branded 404
- `app/sitemap.ts` and `app/robots.ts` — crawler metadata
- `components/SiteHeader.tsx` — client-only scroll and mobile navigation island
- `components/WorkSection.tsx` — client-only project selection and lazy case-study modal
- `components/Reveal.tsx` — client-only IntersectionObserver reveal island
- `components/ResearchTimeline.tsx` — client-only research tabs
- `components/ThemeToggle.tsx` — client-only theme preference
- `lib/content.ts` — typed project, evidence, architecture, metric, and research data
- `public/Muhammad-Hamza-Mushtaq-CV.pdf` — supplied CV for view/download

## Content model

Projects use stable slugs and structured fields for status, role, timeline, categories, technologies, capabilities, architecture nodes, metrics, claims, limitations, and optional links. Claims are explicitly classified as `confirmed`, `attributed`, `inferred`, or `unknown` so unsupported achievements are not presented as facts.

Adding a project should primarily require a new entry in `lib/content.ts`; case-study pages are generated through `generateStaticParams`.

## Performance and accessibility

- Static server-rendered routes by default
- Client React isolated to interactive islands
- Dynamic import for the case-study modal
- `next/font` optimized fonts
- IntersectionObserver reveal behavior
- Reduced-motion support
- Mobile navigation with `aria-expanded` and `aria-controls`
- Direct email contact without requiring a form
- No database, CMS, analytics, or exposed secrets in the initial version
