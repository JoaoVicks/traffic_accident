---
trigger: always_on
description: Conventions for rendering and styling SVG icons as React components in the Beltwise frontend.
---

# SVG Icon Component Rules

## 1. Render UI Icons as Inline React Components

- Do not render UI or primitive SVG icons through `<img>` tags (`<img src={...svg} />`), because CSS `color` and `currentColor` cannot style external SVG images across component states.
- Raster images and non-icon artwork (such as `.png` badges or photos) may continue using `<img>`.

## 2. Use `currentColor` Instead of Hardcoded Hex Colors

- Replace hardcoded hex `stroke` or `fill` attributes (such as `#979797`, `#FFFBA9`, or `#FFFFF2`) with `currentColor` inside icon `<svg>` elements.
- Control icon color from the parent component using design-token text classes (e.g., `text-(--white-800)`, `text-(--black-300)`), never hardcoded hex values.

## 3. File Organization & Component API

- Place reusable icon components under `src/design-system/primitives/icons/`.
- Follow the one-component-per-file rule with `PascalCase` filenames ending in `Icon` (e.g., `MapIcon.tsx`, `SearchIcon.tsx`).
- Type props with `SVGProps<SVGSVGElement>`, default `aria-hidden="true"`, merge `className`, and spread `...props` onto the `<svg>` element.
- Export every icon component and props type from `src/design-system/primitives/icons/index.ts`, and expose them through `src/design-system/primitives/index.ts`.

## 4. Avoid State-Duplicate Icons

- Do not create separate icon components or SVG files that differ only by color or background surface (such as `selected` vs. `unselected`, or `open` vs. `closed`).
- Apply background surfaces, borders, and state colors on the parent control and reuse a single `currentColor` icon component.

