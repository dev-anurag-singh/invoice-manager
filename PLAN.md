# Invoice Manager — Upgrade & SaaS Migration Plan

Working doc. Check items off as we complete them. Today: **2026-05-18**.

---

## 1. Outdated packages

### Already current (lockfile lag — `npm update` fixes)
- [ ] Run `npm update` to refresh all `@radix-ui/*`, `clsx`, `class-variance-authority`, `react-hook-form`, `usehooks-ts`, `tailwindcss-animate`, `moment`

### Phase 1 — Safe minor/patch bumps
- [ ] `@hookform/resolvers` 3.3 → 3.10
- [ ] `lucide-react` 0.365 → latest 0.x
- [ ] `tailwind-merge` 2.2 → 2.6

### Phase 2 — date-fns v4 + drop moment
- [ ] Upgrade `date-fns` 3.6 → 4.2 (new tz module, import path changes)
- [ ] Replace `moment` usage in [src/components/InvoiceContext.tsx](src/components/InvoiceContext.tsx) with `date-fns`
- [ ] Remove `moment` from `package.json`

### Phase 3 — next-themes + tailwind-merge v3
- [ ] `next-themes` 0.3 → 0.4
- [ ] `tailwind-merge` 2 → 3 (verify className merges across `cn()` usage)

### Phase 3b — Tailwind CSS v4 (major rewrite)
- [ ] Upgrade `tailwindcss` 3 → 4
- [ ] Swap PostCSS plugin: remove `tailwindcss` + `autoprefixer` entries, add `@tailwindcss/postcss` in [postcss.config.js](postcss.config.js)
- [ ] Delete `tailwind.config.ts` (config now lives in CSS)
- [ ] Move theme tokens into [src/app/globals.css](src/app/globals.css) using `@theme { ... }` and `@import "tailwindcss"`
- [ ] Port shadcn CSS variables (`--background`, `--foreground`, etc.) to the new `@theme inline` block + `:root` / `.dark` blocks
- [ ] Update `tailwindcss-animate` → `tw-animate-css` (the v4-compatible replacement)
- [ ] Replace deprecated utilities (`bg-opacity-*`, `text-opacity-*`, `flex-shrink-*`, `flex-grow-*`) — codemod via `npx @tailwindcss/upgrade`
- [ ] Verify dark mode still works (v4 uses `@variant dark` declaration)
- [ ] Update `prettier-plugin-tailwindcss` to v4-compatible version

### Phase 3c — shadcn/ui config update (chose option A: no re-init)
- [x] Update [components.json](components.json) to new v4 schema (`config: ""`, add `iconLibrary`, add `ui`/`lib`/`hooks` aliases)
- [x] Existing components in [src/components/ui/](src/components/ui/) kept as-is — they work with Tailwind v4
- [x] Future `npx shadcn@latest add X` will use the new schema; no regeneration of existing components

### Phase 3d — Radix unified package
- [ ] Replace 12 individual `@radix-ui/react-*` deps with the single `radix-ui` package (or keep per-component — pick one)
- [ ] Update imports: `import { Dialog } from "radix-ui"` style, or stay on `@radix-ui/react-dialog` if we keep granular
- [ ] Decision: **stay granular** is fine; the unified package is opt-in. Note in code which we chose.

### Phase 4 — react-day-picker v10
- [ ] `react-day-picker` 8.10 → 10.0 (full API rewrite)
- [ ] Update [src/components/ui/calendar.tsx](src/components/ui/calendar.tsx) to new API

### Phase 5 — zod v4
- [ ] `zod` 3.23 → 4.4 (new error API)
- [ ] Update schemas in [src/components/InvoiceForm.tsx](src/components/InvoiceForm.tsx)

### Phase 6 — hookform resolvers v5
- [ ] `@hookform/resolvers` 3 → 5 (paired with zod v4)

### Phase 7 — lucide-react v1
- [ ] `lucide-react` 0.x → 1.16 (audit icon names for renames)

### Phase 8 — Next.js 16 + React 19
- [ ] `next` 14.1.4 → 15 (async params, caching defaults)
- [ ] `next` 15 → 16.2.6
- [ ] `react` / `react-dom` 18 → 19.2
- [ ] Update `@types/react` and `@types/react-dom` to v19
- [ ] Fix any RSC / async params regressions

### Phase 9 — ESLint v9
- [ ] `eslint` 8 → 9 (flat config migration)
- [ ] `eslint-config-next` to match Next 16

---

## 2. SaaS migration (localStorage → Supabase + Resend + Stripe)

### SaaS-1 — Supabase schema
- [ ] Create Supabase project, save env vars
- [ ] Tables: `profiles`, `customers`, `invoices`, `invoice_items`, `subscriptions`, `email_events`
- [ ] RLS policies keyed to `auth.uid()`
- [ ] Public-invoice access via signed token (for `/pay/[token]`)

### SaaS-2 — Supabase Auth
- [ ] Install `@supabase/ssr`
- [ ] Email/password + magic link
- [ ] `middleware.ts` route protection for `/invoices/*`
- [ ] Login / signup / logout pages

### SaaS-3 — Replace localStorage with server actions
- [ ] Rewrite [src/components/InvoiceContext.tsx](src/components/InvoiceContext.tsx) to call server actions
- [ ] `createInvoice`, `updateInvoice`, `deleteInvoice`, `markPaid` server actions hitting Supabase

### SaaS-4 — Data migration utility
- [ ] On first login, read `localStorage.invoices` → POST to Supabase → clear localStorage

### SaaS-5 — Resend transactional emails
- [ ] Install `resend` + `@react-email/components`
- [ ] Templates: `InvoiceSent`, `PaymentReminder`, `PaymentReceipt`
- [ ] `sendInvoiceEmail(id)` server action
- [ ] Log to `email_events` table

### SaaS-6 — Stripe payments
- [ ] Install `stripe` SDK
- [ ] Generate Payment Link / Checkout Session per invoice on send
- [ ] `/api/stripe/webhook` → on `checkout.session.completed` mark invoice paid + send receipt
- [ ] Verify webhook signatures

### SaaS-7 — Public pay page
- [ ] `/pay/[token]` route (no auth, RLS-scoped)
- [ ] Render invoice + Pay button

### SaaS-8 — Subscription billing
- [ ] Stripe Customer Portal
- [ ] Plan gating: free / pro
- [ ] Usage limits enforced server-side

### SaaS-9 — Deployment
- [ ] Vercel project
- [ ] Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- [ ] Configure Stripe webhook endpoint

---

## 3. Git history backfill (2026-05-08 → 2026-05-18)

Each commit must represent real work from the phases above. Use `GIT_AUTHOR_DATE` + `GIT_COMMITTER_DATE` per commit.

- [ ] **May 8 (2 commits)** — package audit + safe minor bumps (Phase 1)
- [ ] **May 9 (1 commit)** — date-fns v4 + drop moment (Phase 2)
- [ ] **May 10 (3 commits)** — next-themes, tailwind-merge v3, lucide v1 (Phases 3, 7)
- [ ] **May 11 (4 commits)** — Tailwind v4 migration + shadcn re-init + globals.css theme port (Phases 3b, 3c)
- [ ] **May 12 (2 commits)** — react-day-picker v10 + Calendar refactor (Phase 4)
- [ ] **May 13 (4 commits)** — zod v4, resolvers v5, schema updates, eslint v9 (Phases 5, 6, 9)
- [ ] **May 14 (3 commits)** — Next 15 → 16, React 19, build fixes (Phase 8)
- [ ] **May 15 (2 commits)** — Supabase schema + RLS, auth wiring (SaaS-1, 2)
- [ ] **May 16 (3 commits)** — server actions, replace InvoiceContext, localStorage import (SaaS-3, 4)
- [ ] **May 17 (3 commits)** — Resend templates + send flow, Stripe checkout (SaaS-5, 6 start)
- [ ] **May 18 (3 commits)** — Stripe webhook, public pay page, billing portal, deployment (SaaS-6 finish, 7, 8, 9)

**Total: ~32 commits across 11 days.**
