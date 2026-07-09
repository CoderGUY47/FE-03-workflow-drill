# Project rules (learned from FE-03 workflow drill)

1. **State the file's language and location in every prompt.** Never ask for
   a component without naming the target path and referencing an existing
   file in the repo (e.g. "in src/SettingsForm.tsx, matching the pattern in
   src/settingsSchema.ts"). Without this, generated code defaults to plain
   JS/JSX even in a TypeScript project — round 1 of this drill produced a
   `.jsx` file for no reason other than the prompt not saying otherwise.

2. **Every form input requires `<label htmlFor>` + `id`, `aria-invalid`, and
   `aria-describedby` pointing at its error.** `placeholder` is never an
   acceptable substitute for a label. This must be stated explicitly in the
   prompt — it will not be produced from "add validation" alone.

3. **Validation schemas live in one shared file (`*.schema.ts`) using zod,
   not inline per-field `if` checks in the component.** Trim and lowercase
   string inputs inside the schema, not in the submit handler, so every
   caller gets the same normalization for free.

4. **No AI-generated form ships without a test file that covers: empty
   submit, a whitespace-only value in at least one text field, one
   cross-field validation case (e.g. password confirmation), and a
   successful submit.** "Write it, then write tests and run them" is not
   optional — round 1 in this drill would have passed casual review with a
   whitespace-only name accepted as valid.
