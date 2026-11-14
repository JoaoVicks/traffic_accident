import type { ButtonHTMLAttributes } from 'react';
import { ChevronDownIcon } from '../icons';

export type RankingSelectContext = 'closed' | 'open';

export interface RankingSelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Trigger geometry context evidenced in Figma (`closed`: 144px, `open`: 154px). */
  context?: RankingSelectContext;
  /** Visible trigger label. Defaults to Figma specimen text ("Com mais acidentes"). */
  label?: string;
}

const CONTEXT_STYLES: Record<
  RankingSelectContext,
  { outer: string; innerGap: string }
> = {
  closed: {
    outer: 'w-[144px] p-2',
    innerGap: 'gap-2',
  },
  open: {
    outer: 'w-[154px] px-3 py-2',
    innerGap: 'gap-2',
  },
};

/**
 * Ranking sort selector trigger (`Control/Select ranking` — Figma 21:319 & 21:324).
 * Implements the pill trigger in its `closed` and `open` geometries without
 * inventing an unevidenced dropdown menu surface.
 */
export function RankingSelect({
  context = 'closed',
  label = 'Com mais acidentes',
  type = 'button',
  'aria-expanded': ariaExpanded,
  className = '',
  ...props
}: RankingSelectProps) {
  const styles = CONTEXT_STYLES[context];
  const isExpanded = ariaExpanded ?? context === 'open';

  return (
    <button
      type={type}
      aria-haspopup="listbox"
      aria-expanded={isExpanded}
      className={`inline-flex h-[28px] shrink-0 cursor-pointer items-center overflow-clip rounded-(--radius-20) border border-solid border-(--black-400) bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--primary-200) disabled:cursor-not-allowed ${styles.outer} ${className}`.trim()}
      {...props}
    >
      <span
        className={`flex shrink-0 items-center py-0.5 ${styles.innerGap}`}
      >
        <span className="font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-(--line-height-auto) tracking-(--letter-spacing-0) whitespace-nowrap text-(--black-300)">
          {label}
        </span>
        <span
          className="relative h-[5px] w-[12px] shrink-0 text-(--primary-200)"
          aria-hidden="true"
        >
          <span className="absolute inset-[-15%_-6.25%]">
            <ChevronDownIcon />
          </span>
        </span>
      </span>
    </button>
  );
}

