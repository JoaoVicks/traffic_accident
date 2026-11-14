import type { ButtonHTMLAttributes } from 'react';
import { SearchIcon } from '../icons';

export interface IncidentDetailsButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visible action label. Defaults to Figma specimen text ("mais detalhes"). */
  label?: string;
}

/**
 * Pill action opening the incident detail context (`Button/Incident details` — Figma 21:41).
 * Preserves fixed source dimensions, leading detail glyph, and unbound `black - 400` surface.
 */
export function IncidentDetailsButton({
  label = 'mais detalhes',
  type = 'button',
  className = '',
  ...props
}: IncidentDetailsButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[30px] w-[134px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--radius-188-060) bg-(--black-400) px-2 py-2 text-[length:var(--font-size-13-164)] font-(--font-weight-medium) leading-(--line-height-auto) tracking-(--letter-spacing-0) text-(--white-250) whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${className}`.trim()}
      {...props}
    >
      <span className="relative size-[11.284px] shrink-0" aria-hidden="true">
        <span className="absolute inset-[-6.65%]">
          <SearchIcon />
        </span>
      </span>
      <span className="font-[var(--font-sans)]">{label}</span>
    </button>
  );
}

