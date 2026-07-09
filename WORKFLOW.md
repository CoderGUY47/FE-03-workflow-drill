# WORKFLOW.md — FE-03: AI-Assisted Workflow Drill

**Feature:** Profile settings form (name, email, optional password change, notifications toggle)
**Round 1 prompt:** "build a settings form with validation" (single shot, accepted as-is)
**Round 2 prompt:** file-referenced, constrained, with an explicit plan → code → test loop (see comment block at the top of `round2-precise/src/SettingsForm.tsx`)

## Correctness

Round 1 validates presence and a basic email regex, but never trims input. `"   "` passes the `!name` / `!email` checks and then passes `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` if it contains an `@`, so a name of pure whitespace is accepted. Password confirmation is only checked `if (password && password !== confirmPassword)`, which is correct logic, but there's no minimum length — `"a"` is a valid new password.

Round 2 uses a shared `zod` schema (`settingsSchema.ts`): `.trim()` on name/email closes the whitespace hole, `.email()` catches malformed addresses after trimming, and password gets an explicit `min(8)` check that's skipped only when the field is genuinely empty (optional password change). The match-check runs via `.refine()` on the whole object, so it fires in exactly one place instead of being re-implemented per form.

## Accessibility

This is the biggest gap. Round 1 uses `placeholder` as the only label — no `<label htmlFor>`, no `id` on the inputs, no `aria-invalid`, no `aria-describedby`. A screen reader announces "edit text," not "Email, edit text." Errors go through `alert()`, which is disruptive and not associated with the field that failed.

Round 2 wires every input to a `<label htmlFor>` + `id` pair, sets `aria-invalid` from `formState.errors`, and points `aria-describedby` at a `role="alert"` paragraph next to the field. Save confirmation goes through an `aria-live="polite"` region instead of `alert()`.

## Edge cases

Round 1 misses: whitespace-only name/email, no password length floor, no disabled/loading state on submit (double-submit is possible by double-clicking), and it shipped as a `.jsx` file in a TypeScript project.

Round 2 handles all of the above and adds `isSubmitting` to disable the button mid-save.

## Review effort

Round 1 took ~2 minutes to generate and looked done at a glance — that's the trap. Reviewing it properly (checking trim behavior, tabbing through with a keyboard, running a screen reader) took longer than round 2 took to generate in the first place.

**AI mistake caught:** round 1 silently generated a `.jsx` file even though the rest of the project is TypeScript — the prompt never referenced the project's actual file conventions, so the model defaulted to plain JS. Round 2's prompt explicitly pointed at `settingsSchema.ts` and said "this repo uses TypeScript," which fixed it. Lesson: an AI won't infer your project's conventions from nothing — it needs to be told, or shown a file, every time.

## Bottom line

Round 2 took longer to prompt (writing the constraints) but roughly the same total time once round 1's review and rework is counted. The real cost of the vague prompt wasn't generation time, it was the accessibility and edge-case bugs that a quick glance wouldn't catch.

## Post-implementation bug: CSS specificity conflict

After styling with Tailwind CSS v4, all input fields rendered flat — no padding, no height, no visual depth — despite `px-4 py-3` classes being applied and confirmed in the compiled CSS output.

**Root cause:** The Vite scaffold template ships with a manual universal reset in `index.css`:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;  /* overrides Tailwind utility classes on every element */
}
```

Because this rule appeared **after** `@import "tailwindcss"`, it outweighed every `.py-3` and `.px-4` utility class in the cascade. Tailwind generated the rules correctly — they were visible in the compiled CSS — but the universal selector reset silently won specificity.

The fix: remove the manual reset from `index.css` and let Tailwind v4's built-in **Preflight** (which it already imports) handle cross-browser normalization. Also cleared `App.css` of all legacy Vite template styles.

**Lesson:** When scaffolding a project, immediately delete or inspect the template CSS before adding utility-class styling. An AI generating Tailwind classes won't flag template-level conflicts — it has no visibility into the cascade at runtime.
