# Setup — turning these files into the two required branches

Run this from inside your actual project repo (the one your capstone lives
in), not a new empty repo. Adjust paths to match where your components
already live (e.g. `src/components/settings/`).

```bash
# --- Round 1 branch ---
git checkout -b workflow-drill/round1-vague
mkdir -p src/components/settings
cp round1-vague/src/SettingsForm.jsx src/components/settings/SettingsForm.jsx
git add src/components/settings/SettingsForm.jsx
git commit -m "FE-03 round 1: vague prompt, accepted as-is"
git push -u origin workflow-drill/round1-vague

# --- Round 2 branch ---
git checkout main   # or your default branch
git checkout -b workflow-drill/round2-precise
mkdir -p src/components/settings
cp round2-precise/src/SettingsForm.tsx src/components/settings/SettingsForm.tsx
cp round2-precise/src/settingsSchema.ts src/components/settings/settingsSchema.ts
cp round2-precise/src/SettingsForm.test.tsx src/components/settings/SettingsForm.test.tsx

# install the extra deps round 2 needs
npm install react-hook-form zod @hookform/resolvers
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

git add src/components/settings/
git commit -m "FE-03 round 2: precise prompt + verification tests"
git push -u origin workflow-drill/round2-precise

# run the tests before you commit, not after
npx vitest run
```

If your test runner isn't Vitest (e.g. Jest via CRA), swap the test-only
deps: `npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event`
— the test file itself needs no changes, `describe/it/expect` are the same API.

## Also push to the root of the repo (not inside a branch-specific folder)
- `WORKFLOW.md` → commit on whichever branch you merge last, or on `main`
- `CLAUDE.md` → merge into your existing rules file if you already have one;
  otherwise commit at repo root
