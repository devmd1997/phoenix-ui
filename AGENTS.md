# Phoenix UI — AGENTS.md

You are working in the Phoenix UI monorepo.

## 1) Project purpose & design theme

Phoenix UI is a token-driven React component library and design system focused on:
- Clarity and composability
- Explicit design intent (no magic numbers in component APIs)
- Consistent typography and spacing rhythm
- A “rebirth” aesthetic: warm energy, calm surfaces, subtle blended gradients, and understated outlines for hover/focus rather than heavy fills.

The goal is a clean, modern UI kit that scales from primitives to complex components without losing consistency.

## 2) Core principles (must follow)

### Intent over implementation
- Prefer semantic props (tokens/variants) over raw CSS values.
- Avoid arbitrary values like `mt-[18px]` or inline styles unless explicitly requested.

### Token-first
- Colors, spacing, radius, typography, shadows should come from design tokens.
- Spacing tokens are defined as CSS variables:
  --ui-1, --ui-2, --ui-3, --ui-4, --ui-6, --ui-8, --ui-12, --ui-16 (rem-based).

### Separation of responsibilities
- Spacing = distance (margin/padding); invisible; no surfaces.
- Box = structural container (padding + optional surface/border/radius).
- Stack/Grid = layout/arrangement (gap, alignment, distribution).
- Text = typography semantics and tone.

Do not blur these responsibilities.

## 3) Technical constraints & conventions

### Tailwind v4 + build-time safety
- Tailwind must be able to “see” class strings at build time.
- Do NOT generate arbitrary Tailwind classes via string interpolation like:
  `\`ui:m-\${n}\`` or `\`ui:text-\${variant}\``.
- If a prop drives styling, map it to a finite set of known classes (explicit lookup maps).
- Responsive behavior must also resolve to finite classes (e.g. `md:ui:p-4` from a known map).

### CVA usage
- Components use class-variance-authority (CVA) for variants.
- Prefer CVA or explicit lookup maps; ensure variants are typed and exported.
- Use `cn` (clsx + tailwind-merge) for class merging.

### React
- Avoid creating components inside render (define helpers outside).
- Prefer `forwardRef` for reusable primitives when appropriate.

## 4) Repository layout (important)

- UI package: `packages/ui`
  - Components live in: `packages/ui/src/components/**`
  - Utilities live in: `packages/ui/src/utlis/**` (note spelling)
  - Public exports: `packages/ui/src/index.ts`
  - Build output: `packages/ui/dist/**` (JS + index.d.ts + styles.css)
  - Tailwind entry CSS: `packages/ui/src/tailwind-entry.css`

- Storybook / docs app: `apps/docs`
  - Stories live in: `apps/docs/src/stories/**`
  - MDX docs/guides should live in: `apps/docs/src/docs/**` (avoid indexing errors)
  - `.storybook/main.ts` controls story globs and addons

## 5) Documentation expectations

### Storybook AutoDocs
- Use CSF stories (`*.stories.tsx`) with `tags: ["autodocs"]` for baseline docs.
- Ensure each component has:
  - Playground story (controls)
  - Variant coverage story (renders all CVA variants)
  - Edge cases (long text, truncate, etc.) when relevant

### Generated docs
- We use a docs generator script to create/update stories and MDX guide stubs from CVA variants.
- Do not hand-edit generated files if the generator owns them; instead update the generator or component source.

### “Docs Checklist”
- Each component’s docs should include: variants, responsive behavior (if applicable), accessibility notes, theming/tokens reference, and edge cases.

## 6) How to make changes (workflow)

When implementing or modifying components:
1) Read the relevant component + its exports.
2) Keep diffs small and localized.
3) Update `packages/ui/src/index.ts` exports if you add new public APIs.
4) Ensure types are emitted correctly (index.d.ts should include new exports).
5) If component variants change, regenerate docs and verify Storybook still runs.

## 7) Testing & verification

Prefer a tight verification loop:
- Build UI package when changing build/export/type behavior.
- Run Storybook when changing docs/stories.
- If you add a new prop or variant, add or update stories demonstrating it.

## 8) Output preferences for Codex

- Prefer minimal, reviewable edits.
- Explain decisions briefly in comments or commit message style notes when helpful.
- If uncertain about a repo-specific convention, search within the repo for an existing pattern and follow it.

End of instructions.
