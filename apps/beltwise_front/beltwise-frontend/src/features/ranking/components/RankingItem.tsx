import { cn } from 'cn';
import { formatMetricCount } from '@/features/analytics';
import type { RankingEntry } from '../types/ranking';

export interface RankingItemProps {
  entry: RankingEntry;
  /** Omits bottom border on the final row (`1:2268`). */
  isLast?: boolean;
  className?: string;
}

/**
 * Single ranked entity row matching Figma `Ranking/RankedRow` (`23:898` / `1:2223`).
 */
export function RankingItem({
  entry,
  isLast = false,
  className,
}: RankingItemProps) {
  return (
    <li
      data-slot="ranking-item"
      className={cn(
        'flex w-full shrink-0 items-center justify-between gap-3 pb-[12px]',
        !isLast && 'border-b border-(--black-430)',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-[4px]">
        <span className="shrink-0 font-[var(--font-sans)] text-[length:var(--font-size-13-217)] font-(--font-weight-regular) leading-none text-(--text-gray-ranking-ordinal) tabular-nums">
          {entry.position}°
        </span>
        <span
          title={entry.name}
          className="truncate font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-none text-(--text-gray-ranking-name)"
        >
          {entry.name}
        </span>
      </div>

      <span className="shrink-0 font-[var(--font-sans)] text-[length:var(--font-size-12)] font-(--font-weight-regular) leading-none whitespace-nowrap text-(--text-gray-ranking-value) tabular-nums">
        {formatMetricCount(entry.value)}
      </span>
    </li>
  );
}

