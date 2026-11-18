import { cn } from 'cn';
import { RankingMoreButton } from '@/design-system/primitives';
import type { RankingEntry } from '../types/ranking';
import { RankingItem } from './RankingItem';

export interface RankingListProps {
  entries: readonly RankingEntry[];
  /** Whether the list is expanded beyond the initial 10 items. */
  isExpanded?: boolean;
  /** Whether more entries are available to toggle via `"ver mais"`. */
  canExpand?: boolean;
  /** Toggles between top 10 and full ranked entries. */
  onToggleExpand?: () => void;
  className?: string;
}

/**
 * Ranked entity list card (`1:2222`) paired with the centered `"ver mais"` action (`1:2273`).
 */
export function RankingList({
  entries,
  isExpanded = false,
  canExpand = false,
  onToggleExpand,
  className,
}: RankingListProps) {
  return (
    <div
      data-slot="ranking-list-section"
      className={cn('flex w-full flex-col items-center gap-[12px]', className)}
    >
      <ol
        aria-label="Lista de posições do ranking"
        data-slot="ranking-list"
        className="flex w-full flex-col items-center gap-[12px] rounded-(--radius-10) bg-(--black-430) px-[10px] pt-[15px]"
      >
        {entries.map((entry, index) => (
          <RankingItem
            key={entry.id}
            entry={entry}
            isLast={index === entries.length - 1}
          />
        ))}
      </ol>

      {canExpand && onToggleExpand ? (
        <RankingMoreButton
          label={isExpanded ? 'ver menos' : 'ver mais'}
          aria-expanded={isExpanded}
          onClick={onToggleExpand}
        />
      ) : null}
    </div>
  );
}

