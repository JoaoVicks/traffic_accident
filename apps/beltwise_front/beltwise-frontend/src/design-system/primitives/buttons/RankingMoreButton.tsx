import type { ButtonHTMLAttributes } from 'react';
import { ListSearchIcon } from '../icons';

export interface RankingMoreButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visible action label. Defaults to Figma specimen text ("ver mais"). */
  label?: string;
}

/**
 * Compact action to request more ranking content (`Button/Ranking more` — Figma 21:51).
 * Kept separate from `IncidentDetailsButton` per Figma: uses literal gray `#383838`,
 * 125 × 23 px geometry, radius 8 px, and 14 px Regular typography.
 */
export function RankingMoreButton({
  label = 'ver mais',
  type = 'button',
  className = '',
  ...props
}: RankingMoreButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[23px] w-[125px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-(--radius-8) bg-(--observed-color-383838) px-2 py-1 text-[length:var(--font-size-14)] font-(--font-weight-regular) leading-(--line-height-auto) tracking-(--letter-spacing-0) text-(--white-250) whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${className}`.trim()}
      {...props}
    >
      <span className="relative h-[9px] w-[10.688px] shrink-0" aria-hidden="true">
        <span className="absolute inset-[-4.69%_-3.95%]">
          <ListSearchIcon />
        </span>
      </span>
      <span className="font-[var(--font-sans)]">{label}</span>
    </button>
  );
}

