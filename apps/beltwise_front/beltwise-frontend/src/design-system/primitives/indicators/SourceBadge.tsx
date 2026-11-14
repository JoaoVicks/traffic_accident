import type { HTMLAttributes } from 'react';
import badgeSourcePrfImage from '../../../assets/primitives/badge-source-prf.png';

export interface SourceBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Visible data source label. Defaults to Figma specimen text ("PRF"). */
  label?: string;
}

/**
 * Data source attribution badge (`Badge/Source` — Figma 21:148).
 * Preserves fixed 71 × 24 px geometry, `black - 430` surface, `white - 250` text,
 * 16 px Regular Overpass typography, and the PRF emblem image.
 */
export function SourceBadge({
  label = 'PRF',
  className = '',
  ...props
}: SourceBadgeProps) {
  return (
    <span
      className={`inline-flex h-[24px] w-[71px] shrink-0 items-center justify-center gap-2 rounded-(--radius-6) bg-(--black-430) px-2 py-1 font-[var(--font-sans)] text-[length:var(--font-size-16)] font-(--font-weight-regular) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--white-250) ${className}`.trim()}
      {...props}
    >
      <span>{label}</span>
      <span className="flex flex-none items-center justify-center" aria-hidden="true">
        <span className="-scale-y-100 rotate-180">
          <span className="relative block h-[14px] w-[11.536px]">
            <img
              alt=""
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              src={badgeSourcePrfImage}
            />
          </span>
        </span>
      </span>
    </span>
  );
}

