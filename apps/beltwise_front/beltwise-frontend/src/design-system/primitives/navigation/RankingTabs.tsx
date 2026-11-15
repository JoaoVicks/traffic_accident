import type { HTMLAttributes, KeyboardEvent } from 'react';
import { RankingTabItem, type RankingTabCategory } from './RankingTabItem';

const RANKING_ORDER: readonly RankingTabCategory[] = ['cities', 'states', 'roads'];

export interface RankingTabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Active ranking category tab. Defaults to `cities` per Figma (`Tabs/Ranking` — 21:278). */
  value?: RankingTabCategory;
  /** Optional handler invoked when a tab is clicked or changed via Left/Right arrow keys. */
  onValueChange?: (category: RankingTabCategory) => void;
}

/**
 * Ranking category tab list (`Tabs/Ranking` — Figma 21:278).
 */
export function RankingTabs({
  value = 'cities',
  onValueChange,
  'aria-label': ariaLabel = 'Categoria de ranking',
  className = '',
  ...props
}: RankingTabsProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onValueChange) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const currentIndex = RANKING_ORDER.indexOf(value);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + offset + RANKING_ORDER.length) % RANKING_ORDER.length;
    onValueChange(RANKING_ORDER[nextIndex]);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={`flex h-[21px] w-[228px] shrink-0 items-center gap-2 ${className}`.trim()}
      {...props}
    >
      <RankingTabItem
        category="cities"
        selected={value === 'cities'}
        onClick={() => onValueChange?.('cities')}
      />
      <RankingTabItem
        category="states"
        selected={value === 'states'}
        onClick={() => onValueChange?.('states')}
      />
      <RankingTabItem
        category="roads"
        selected={value === 'roads'}
        onClick={() => onValueChange?.('roads')}
      />
    </div>
  );
}

