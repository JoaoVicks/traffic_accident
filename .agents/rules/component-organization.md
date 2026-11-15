---
trigger: always_on
description: Component architecture and file organization conventions for the Beltwise frontend.
---

# Component Organization Rules

## 1. One Component Per File

- Every React component must have its own `.tsx` file.
- Never declare multiple independent React components in the same file.
- The filename must use PascalCase and match the component name.
- Supporting types can remain in the component file unless shared across components.

## 2. Group Components by Category

- Organize primitive components into folders according to their type.
- Examples: `buttons/`, `inputs/`, `selection/`, `navigation/`, `indicators/`.
- Do not group unrelated components in the same folder.
- Do not create empty folders.

## 3. Exports

- Each category must have an `index.ts` barrel file.
- The root `primitives/index.ts` must expose the public primitive API.
- Avoid unnecessary or duplicated exports.

## 4. Reusability

- Components must remain independent of feature-specific business logic.
- Prefer composition over unnecessary component complexity.
- Follow existing naming and prop conventions.
- Reuse existing design tokens instead of hardcoding visual values.