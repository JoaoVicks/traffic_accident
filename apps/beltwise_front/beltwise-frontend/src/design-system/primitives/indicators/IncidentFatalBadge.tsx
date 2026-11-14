import type { HTMLAttributes } from 'react';

export interface IncidentFatalBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Visible badge label. Defaults to Figma specimen text ("acidente fatal"). */
  label?: string;
}

/**
 * Fatal incident classification pill badge (`Badge/Incident fatal` — Figma 21:138).
 * Preserves fixed 95 × 20 px pill geometry, unbound literal fill `#FF3636`,
 * `#FFFFFF` text, and 12 px Medium Overpass typography.
 */
export function IncidentFatalBadge({
  label = 'acidente fatal',
  className = '',
  ...props
}: IncidentFatalBadgeProps) {
  return (
    <span
      className={`inline-flex h-[20px] w-[95px] shrink-0 items-center justify-center rounded-(--radius-8) bg-(--observed-color-ff3636) p-1 font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-medium) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--observed-color-ffffff) ${className}`.trim()}
      {...props}
    >
      {label}
    </span>
  );
}

