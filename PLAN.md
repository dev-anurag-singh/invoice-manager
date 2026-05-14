# Invoice Manager — Upgrade & SaaS Migration Plan

Working doc. Check items off as we complete them. Today: **2026-05-18**.

---

## 1. Outdated packages — ✅ ALL DONE

### Phase 1 — Safe minor/patch bumps ✅
- [x] `@hookform/resolvers` 3.3 → 3.10 (later → 5)
- [x] `lucide-react` 0.365 → 0.x (later → 1.16)
- [x] `tailwind-merge` 2.2 → 2.6 (later → 3)
- [x] `npm update` to refresh Radix, clsx, cva, react-hook-form, usehooks-ts

### Phase 2 — date-fns v4 + drop moment ✅
- [x] `date-fns` 3.6 → 4.2
- [x] Replaced `moment` with `date-fns` across InvoiceContext, InvoiceForm, InvoiceCard, [invoiceId] page
- [x] Removed `moment` from deps

### Phase 3 — next-themes + tailwind-merge v3 + lucide v1 ✅
- [x] `next-themes` 0.3 → 0.4
- [x] `tailwind-merge` 2 → 3
- [x] `lucide-react` → 1.16 (all icon names still valid)

### Phase 3b — Tailwind CSS v4 ✅
- [x] `tailwindcss` 3 → 4, `@tailwindcss/postcss` plugin, removed autoprefixer
- [x] Deleted `tailwind.config.ts`, moved theme into [globals.css](src/app/globals.css) `@theme`
- [x] `tailwindcss-animate` → `tw-animate-css`
- [x] Ran `npx @tailwindcss/upgrade` codemod; dark mode verified

### Phase 3c — shadcn/ui config update (option A: no re-init) ✅
- [x] Updated [components.json](components.json) to v4 schema
- [x] Existing ui components kept as-is

### Phase 3d — Radix unified package — DECISION: stayed granular
- [x] Kept per-component `@radix-ui/react-*` (the unified `radix-ui` pkg is opt-in; no need)

### Phase 4 — react-day-picker v10 ✅
- [x] 8.10 → 10.0, rewrote [calendar.tsx](src/components/ui/calendar.tsx) for new API (`initialFocus`→`autoFocus`, `Chevron` component)

### Phase 5/6 — zod v4 + resolvers v5 ✅
- [x] `zod` 3 → 4 (`invalid_type_error`→`message`), `@hookform/resolvers` 3 → 5
- [x] Updated useForm input/output typing in [InvoiceForm.tsx](src/components/InvoiceForm.tsx)

### Phase 7 — lucide-react v1 ✅ (done in Phase 3)

### Phase 8 — Next.js 16 + React 19 ✅
- [x] `next` 14 → 15 → 16.2.6, `react`/`react-dom` 18 → 19
- [x] `@types/react`/`@types/react-dom` → 19
- [x] Unwrapped async `params` with `React.use()` in [invoiceId] page
- [x] Rewrote `useIsMounted` with `useSyncExternalStore` (React Compiler rule)

### Phase 9 — ESLint 9 ✅
- [x] ESLint 8 → 9, flat config; `eslint-config-next` → 16 native flat config

### Remaining (out of original scope — optional future bumps)
- [ ] `@types/node` 20 → 25, `eslint` 9 → 10, `typescript` 5 → 6, `eslint-plugin-react-hooks` 5 → 7 (majors; defer)

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
