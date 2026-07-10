# FE-03 — AI-Assisted Workflow Drill

**Track:** Frontend AI Engineering · **Week:** 2 · **Phase:** Foundations · **Workload:** 4h

## What this is

A settings form (name, email, optional password change, notifications toggle) built **twice** to make the difference between vague and precise AI prompting visible in real code.

## Branches

| Branch | Prompt style | Output |
|---|---|---|
| [`workflow-drill/round1-vague`](../../tree/workflow-drill/round1-vague) | Single vague prompt — accepted as-is | `SettingsForm.jsx` — plain JS, `alert()` errors, no labels, no tests |
| [`workflow-drill/round2-precise`](../../tree/workflow-drill/round2-precise) | File-referenced, constrained, plan→code→test loop | `SettingsForm.tsx` — TypeScript, Zod schema, full aria-*, 5 Vitest tests passing |

## Key files

| File | Purpose |
|---|---|
| [`WORKFLOW.md`](./WORKFLOW.md) | 500-word diff analysis: correctness, accessibility, edge cases, review effort |
| [`CLAUDE.md`](./CLAUDE.md) | 6 project rules learned from this drill |
| [`src/components/settings/SettingsForm.tsx`](./src/components/settings/SettingsForm.tsx) | Round 2 form — precise prompt output |
| [`src/components/settings/SettingsForm.jsx`](./src/components/settings/SettingsForm.jsx) | Round 1 form — vague prompt output |
| [`src/components/settings/SettingsForm.test.tsx`](./src/components/settings/SettingsForm.test.tsx) | Vitest + RTL tests (5/5 passing) |

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run test     # vitest — 5 tests
```

## Biggest finding

> Round 1 silently generated a `.jsx` file in a TypeScript project, accepted whitespace-only inputs as valid, used `alert()` for errors, and had no accessible labels. None of this was obvious at a glance — it looked finished. That's the trap.

See [`WORKFLOW.md`](./WORKFLOW.md) for the full analysis.
